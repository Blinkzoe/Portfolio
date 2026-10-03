from datetime import datetime, timedelta
import json
import os
import sqlite3

from database import DB_PATH, init_db
from dotenv import load_dotenv
from fastapi import BackgroundTasks, Depends, FastAPI, HTTPException, Request, status
from fastapi.responses import HTMLResponse
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from models import get_ip_info, parse_user_agent
import httpx
import pytz
from schemas import TrackRequest

load_dotenv()

app = FastAPI()
security = HTTPBasic()

ADMIN_USER = os.getenv("ADMIN_USER")
ADMIN_PASS = os.getenv("ADMIN_PASS")
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")

init_db()

TZ_MEXICO = pytz.timezone("America/Mexico_City")


def verify_credentials(credentials: HTTPBasicCredentials = Depends(security)):
    correct_user = credentials.username == ADMIN_USER
    correct_pass = credentials.password == ADMIN_PASS
    if not (correct_user and correct_pass):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username


async def send_telegram_alert(section: str, page: str, ip: str, country: str, city: str):
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        return
    
    # Mensaje formateado para Telegram
    message = (
        f"🚨 **¡Nueva Visita en el Portafolio!**\n\n"
        f"📌 **Sección:** {section}\n"
        f"🌐 **Procedencia:** {page}\n"
        f"🌍 **IP:** {ip}\n"
        f"📍 **Ubicación:** {city}, {country}"
    )
    
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": message,
        "parse_mode": "Markdown"
    }
    
    async with httpx.AsyncClient() as client:
        try:
            await client.post(url, json=payload, timeout=5.0)
        except Exception:
            pass  # Si falla Telegram de forma temporal, no afecta la respuesta web


@app.post("/track")
async def track_click(data: TrackRequest, request: Request, background_tasks: BackgroundTasks):
    try:
        section = data.section

        # Obtenemos la página exacta mandada desde el frontend, o usamos una por defecto si no viene
        pagina_origen = (
            data.page
            if data.page and data.page != "No especificada"
            else "Directo / Mismo sitio"
        )

        forwarded = request.headers.get("x-forwarded-for")
        if forwarded:
            client_ip = forwarded.split(",")[0].strip()
        elif request.client:
            client_ip = request.client.host
        else:
            client_ip = "127.0.0.1"

        user_agent = request.headers.get("user-agent", "Desconocido")
        accept_lang = request.headers.get("accept-language", "-")
        local_timestamp = datetime.now(TZ_MEXICO).isoformat()

        ip_info = await get_ip_info(client_ip)
        device, browser, os_name = parse_user_agent(user_agent)

        country = ip_info.get("country", "-")
        region = ip_info.get("region", "-")
        city = ip_info.get("city", "-")

        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            """
                INSERT INTO clicks (
                    section, ip, user_agent, timestamp, 
                    country, region, city, zip, lat, lon, 
                    isp, org, asn, asname, timezone, 
                    device, browser, os_name, referer, accept_language
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                section,
                client_ip,
                user_agent,
                local_timestamp,
                country,
                region,
                city,
                ip_info.get("zip", "-"),
                ip_info.get("lat", 0),
                ip_info.get("lon", 0),
                ip_info.get("isp", "-"),
                ip_info.get("org", "-"),
                ip_info.get("asn", "-"),
                ip_info.get("asname", "-"),
                ip_info.get("timezone", "-"),
                device,
                browser,
                os_name,
                pagina_origen,
                accept_lang,
            ),
        )
        conn.commit()
        conn.close()

        # Disparamos la alerta de Telegram en segundo plano de forma instantánea
        background_tasks.add_task(send_telegram_alert, section, pagina_origen, client_ip, country, city)

        return {"status": "success"}
    except Exception as e:
        return {"status": "error", "detail": str(e)}




@app.get("/analytics", response_class=HTMLResponse)
async def analytics(credentials: HTTPBasicCredentials = Depends(security)):
    verify_credentials(credentials)

    import html
    import json

    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row

    try:
        rows = conn.execute("""
            SELECT
                id,
                section,
                ip,
                user_agent,
                timestamp,
                country,
                region,
                city,
                zip,
                lat,
                lon,
                isp,
                org,
                asn,
                asname,
                timezone,
                device,
                browser,
                os_name,
                referer,
                accept_language
            FROM clicks
            ORDER BY id DESC
        """).fetchall()

        total_visitas = len(rows)

        ips_unicas = len({
            str(r["ip"]).strip()
            for r in rows
            if r["ip"]
        })

        hoy = datetime.now(TZ_MEXICO).strftime("%Y-%m-%d")

        visitas_hoy = sum(
            1 for r in rows
            if r["timestamp"]
            and str(r["timestamp"])[:10] == hoy
        )

        # -----------------------------------------------------
        # OPCIONES DE FILTRO
        # -----------------------------------------------------

        ips = sorted({
            str(r["ip"]).strip()
            for r in rows
            if r["ip"]
        })

        sections = sorted({
            str(r["section"]).strip()
            for r in rows
            if r["section"]
        })

        dates = sorted({
            str(r["timestamp"])[:10]
            for r in rows
            if r["timestamp"]
        }, reverse=True)

        ip_options = "".join(
            '<option value="' +
            html.escape(ip, quote=True) +
            '">' +
            html.escape(ip) +
            '</option>'
            for ip in ips
        )

        section_options = "".join(
            '<option value="' +
            html.escape(section, quote=True) +
            '">' +
            html.escape(section) +
            '</option>'
            for section in sections
        )

        date_options = "".join(
            '<option value="' +
            html.escape(date, quote=True) +
            '">' +
            html.escape(date) +
            '</option>'
            for date in dates
        )

        # -----------------------------------------------------
        # TABLA
        # -----------------------------------------------------

        rows_html = ""

        for r in rows:

            timestamp = str(r["timestamp"] or "")
            fecha = timestamp[:10]

            ip = str(r["ip"] or "")
            section = str(r["section"] or "")

            country = str(r["country"] or "")
            region = str(r["region"] or "")
            city = str(r["city"] or "")
            zip_code = str(r["zip"] or "")

            lat = str(r["lat"] or "")
            lon = str(r["lon"] or "")

            isp = str(r["isp"] or "")
            org = str(r["org"] or "")
            asn = str(r["asn"] or "")
            asname = str(r["asname"] or "")

            timezone = str(r["timezone"] or "")
            device = str(r["device"] or "")
            browser = str(r["browser"] or "")
            os_name = str(r["os_name"] or "")

            referer = str(r["referer"] or "")
            language = str(r["accept_language"] or "")
            user_agent = str(r["user_agent"] or "")

            location = ", ".join(
                x for x in [city, region, country]
                if x
            )

            coordinates = ""

            if lat and lon:
                coordinates = (
                    '<a href="https://www.google.com/maps?q='
                    + html.escape(lat, quote=True)
                    + ','
                    + html.escape(lon, quote=True)
                    + '" target="_blank" '
                    'class="text-blue-400 hover:text-blue-300">'
                    + html.escape(lat)
                    + ', '
                    + html.escape(lon)
                    + '</a>'
                )

            rows_html += """
<tr
    class="analytics-row border-b border-slate-800/60 hover:bg-slate-900/40"
    data-ip="__IP__"
    data-section="__SECTION__"
    data-date="__DATE__"
>

<td class="px-3 py-3">__ID__</td>

<td class="px-3 py-3">
    <span class="text-blue-400 font-medium">
        __SECTION_TEXT__
    </span>
</td>

<td class="px-3 py-3 text-slate-300">
    __IP_TEXT__
</td>

<td class="px-3 py-3 text-slate-400 whitespace-nowrap">
    __TIMESTAMP__
</td>

<td class="px-3 py-3 text-slate-300">
    __LOCATION__
</td>

<td class="px-3 py-3">
    __COORDINATES__
</td>

<td class="px-3 py-3 text-slate-400">
    __ISP__
</td>

<td class="px-3 py-3 text-slate-400">
    __ORG__
</td>

<td class="px-3 py-3 text-slate-400">
    __ASN__
</td>

<td class="px-3 py-3 text-slate-400">
    __ASNAME__
</td>

<td class="px-3 py-3 text-slate-400">
    __TIMEZONE__
</td>

<td class="px-3 py-3 text-slate-300">
    __DEVICE__
</td>

<td class="px-3 py-3 text-slate-300">
    __BROWSER__
</td>

<td class="px-3 py-3 text-slate-300">
    __OS__
</td>

<td class="px-3 py-3 text-slate-400 max-w-xs truncate"
    title="__REFERER_RAW__">
    __REFERER__
</td>

<td class="px-3 py-3 text-slate-400">
    __LANGUAGE__
</td>

<td class="px-3 py-3 text-slate-500 max-w-sm truncate"
    title="__UA_RAW__">
    __UA__
</td>

<td class="px-3 py-3 text-slate-500">
    __ZIP__
</td>

</tr>
""".replace(
    "__IP__", html.escape(ip, quote=True)
).replace(
    "__SECTION__", html.escape(section, quote=True)
).replace(
    "__DATE__", html.escape(fecha, quote=True)
).replace(
    "__ID__", str(r["id"] or "")
).replace(
    "__SECTION_TEXT__", html.escape(section)
).replace(
    "__IP_TEXT__", html.escape(ip)
).replace(
    "__TIMESTAMP__", html.escape(timestamp)
).replace(
    "__LOCATION__", html.escape(location)
).replace(
    "__COORDINATES__", coordinates
).replace(
    "__ISP__", html.escape(isp)
).replace(
    "__ORG__", html.escape(org)
).replace(
    "__ASN__", html.escape(asn)
).replace(
    "__ASNAME__", html.escape(asname)
).replace(
    "__TIMEZONE__", html.escape(timezone)
).replace(
    "__DEVICE__", html.escape(device)
).replace(
    "__BROWSER__", html.escape(browser)
).replace(
    "__OS__", html.escape(os_name)
).replace(
    "__REFERER_RAW__", html.escape(referer, quote=True)
).replace(
    "__REFERER__", html.escape(referer)
).replace(
    "__LANGUAGE__", html.escape(language)
).replace(
    "__UA_RAW__", html.escape(user_agent, quote=True)
).replace(
    "__UA__", html.escape(user_agent)
).replace(
    "__ZIP__", html.escape(zip_code)
)

        if not rows_html:
            rows_html = """
<tr>
<td colspan="18"
    class="px-4 py-8 text-center text-slate-500">
    No hay registros todavía.
</td>
</tr>
"""

        # -----------------------------------------------------
        # HTML
        # -----------------------------------------------------

        page = """
<!DOCTYPE html>
<html lang="es">

<head>

<meta charset="UTF-8">

<meta name="viewport"
      content="width=device-width, initial-scale=1.0">

<title>Portfolio Analytics</title>




<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script src="https://cdn.tailwindcss.com"></script>




</head>

<body class="bg-slate-950 text-slate-100 min-h-screen">

<div class="max-w-[1800px] mx-auto px-4 py-8">

<!-- HEADER -->

<div class="mb-8">

<h1 class="text-3xl font-bold">
Portfolio Analytics
</h1>

<p class="text-slate-400 mt-2">
Eventos registrados en el portfolio
</p>

</div>


<!-- STATS -->

<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">

<div class="bg-slate-900 border border-slate-800 rounded-xl p-5">

<div class="text-slate-400 text-sm">
Visitas
</div>

<div id="statTotal"
     class="text-3xl font-bold mt-2">
__TOTAL_VISITAS__
</div>

</div>


<div class="bg-slate-900 border border-slate-800 rounded-xl p-5">

<div class="text-slate-400 text-sm">
IP únicas
</div>

<div id="statIps"
     class="text-3xl font-bold mt-2">
__IPS_UNICAS__
</div>

</div>


<div class="bg-slate-900 border border-slate-800 rounded-xl p-5">

<div class="text-slate-400 text-sm">
Visitas hoy
</div>

<div id="statToday"
     class="text-3xl font-bold mt-2">
__VISITAS_HOY__
</div>

</div>


<div class="bg-slate-900 border border-slate-800 rounded-xl p-5">

<div class="text-slate-400 text-sm">
Registros filtrados
</div>

<div id="statFiltered"
     class="text-3xl font-bold mt-2">
__TOTAL_VISITAS__
</div>

</div>

</div>


<!-- FILTROS -->

<div class="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-8">

<div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">

<div>

<label class="block text-sm text-slate-400 mb-2">
IP
</label>

<select id="filterIp"
class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2">

<option value="">
Todas las IP
</option>

__IP_OPTIONS__

</select>

</div>


<div>

<label class="block text-sm text-slate-400 mb-2">
Acción / sección
</label>

<select id="filterSection"
class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2">

<option value="">
Todas las acciones
</option>

__SECTION_OPTIONS__

</select>

</div>


<div>

<label class="block text-sm text-slate-400 mb-2">
Fecha
</label>

<select id="filterDate"
class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2">

<option value="">
Todas las fechas
</option>

__DATE_OPTIONS__

</select>

</div>


<div class="flex items-end">

<button id="clearFilters"
class="w-full px-5 py-2 rounded-lg bg-slate-700 hover:bg-slate-600">

Limpiar filtros

</button>

</div>

</div>


<div class="mt-4 text-sm text-slate-400">

Registros encontrados:

<span id="filterCount"
class="font-semibold text-slate-200">
0
</span>

</div>

</div>


<!-- GRAFICAS -->

<div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

    <!-- GRAFICA 1 -->

    <div class="bg-slate-900 border border-slate-800 rounded-xl p-5">

        <h2 class="text-lg font-semibold mb-4">
            Acciones / Secciones
        </h2>

        <div style="height:350px;">
            <canvas id="historicalChart"></canvas>
        </div>

    </div>


    <!-- GRAFICA 2 -->

    <div class="bg-slate-900 border border-slate-800 rounded-xl p-5">

        <h2 class="text-lg font-semibold mb-4">
            Visitas por fecha
        </h2>

        <div style="
            display:flex;
            width:100%;
            height:350px;
            gap:18px;
            align-items:stretch;
        ">

            <!-- CANVAS -->

            <div style="
                flex:1;
                min-width:0;
                position:relative;
            ">

                <canvas id="dailyChart"></canvas>

            </div>


            <!-- LEYENDA EXTERNA -->

            <div id="dailyLegendExternal" style="
                width:190px;
                min-width:190px;
                max-height:350px;
                overflow-y:auto;
                padding:8px 4px 8px 12px;
                border-left:1px solid rgba(148,163,184,.25);
                font-size:13px;
            ">

            </div>

        </div>

    </div>

</div>


<!-- TABLA -->

<div class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">

<div class="overflow-x-auto">

<table class="min-w-[1800px] w-full text-sm">

<thead class="bg-slate-950">

<tr>

<th class="px-3 py-3 text-left">ID</th>
<th class="px-3 py-3 text-left">Acción</th>
<th class="px-3 py-3 text-left">IP</th>
<th class="px-3 py-3 text-left">Fecha</th>
<th class="px-3 py-3 text-left">Ubicación</th>
<th class="px-3 py-3 text-left">Coordenadas</th>
<th class="px-3 py-3 text-left">ISP</th>
<th class="px-3 py-3 text-left">Organización</th>
<th class="px-3 py-3 text-left">ASN</th>
<th class="px-3 py-3 text-left">AS Name</th>
<th class="px-3 py-3 text-left">Timezone</th>
<th class="px-3 py-3 text-left">Device</th>
<th class="px-3 py-3 text-left">Browser</th>
<th class="px-3 py-3 text-left">OS</th>
<th class="px-3 py-3 text-left">Referer</th>
<th class="px-3 py-3 text-left">Idioma</th>
<th class="px-3 py-3 text-left">User Agent</th>
<th class="px-3 py-3 text-left">ZIP</th>

</tr>

</thead>

<tbody id="analyticsTable">

__ROWS_HTML__

</tbody>

</table>

</div>


<!-- PAGINACION -->

<div class="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 border-t border-slate-800">

<div id="paginationInfo"
class="text-sm text-slate-400">
</div>


<div class="flex items-center gap-3">

<button id="previousPage"
class="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40">

← Anterior

</button>


<span id="pageInfo"
class="text-sm text-slate-400">
</span>


<button id="nextPage"
class="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40">

Siguiente →

</button>

</div>

</div>

</div>

</div>


<script>

document.addEventListener("DOMContentLoaded", function () {

const filterIp =
document.getElementById("filterIp");

const filterSection =
document.getElementById("filterSection");

const filterDate =
document.getElementById("filterDate");

const clearFilters =
document.getElementById("clearFilters");

const filterCount =
document.getElementById("filterCount");

const statTotal =
document.getElementById("statTotal");

const statIps =
document.getElementById("statIps");

const statToday =
document.getElementById("statToday");

const statFiltered =
document.getElementById("statFiltered");

const paginationInfo =
document.getElementById("paginationInfo");

const pageInfo =
document.getElementById("pageInfo");

const previousPage =
document.getElementById("previousPage");

const nextPage =
document.getElementById("nextPage");

const rows =
Array.from(
document.querySelectorAll(".analytics-row")
);


let filteredRows = rows.slice();

let currentPage = 1;

const rowsPerPage = 25;


/* =========================================================
   CHART 1
   ========================================================= */


const historicalChart = new Chart(
    document.getElementById("historicalChart"),
    {
        type: "bar",

        data: {
            labels: [],
            datasets: [
                {
                    label: "Eventos",
                    data: [],
                    backgroundColor: "#3b82f6",
                    borderColor: "#3b82f6",
                    borderWidth: 1
                }
            ]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                },

                tooltip: {
                    mode: "index",
                    intersect: false
                }
            },

            scales: {
                x: {
                    stacked: false
                },

                y: {
                    beginAtZero: true,

                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    }
);


/* =========================================================
   CHART 2
   ========================================================= */

const dailyChart = new Chart(
    document.getElementById("dailyChart"),
    {
        type: "bar",

        data: {
            labels: [],
            datasets: []
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                },

                tooltip: {
                    mode: "index",
                    intersect: false
                }
            },

            scales: {
                x: {
                    stacked: true
                },

                y: {
                    stacked: true,
                    beginAtZero: true,

                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    }
);


/* =========================================================
   UPDATE CHARTS
   ========================================================= */

function updateCharts() {

    /*
     * =====================================================
     * GRÁFICA 1
     * Eventos por sección
     * =====================================================
     */

    const sectionCounts = {};

    /*
     * =====================================================
     * GRÁFICA 2
     * Fechas -> secciones -> cantidad
     * =====================================================
     */

    const dateSectionCounts = {};

    filteredRows.forEach(function(row) {

        const section =
            row.dataset.section || "Sin sección";

        const date =
            row.dataset.date || "Sin fecha";

        sectionCounts[section] =
            (sectionCounts[section] || 0) + 1;

        if (!dateSectionCounts[date]) {
            dateSectionCounts[date] = {};
        }

        dateSectionCounts[date][section] =
            (dateSectionCounts[date][section] || 0) + 1;
    });


    /*
     * =====================================================
     * GRÁFICA 1
     * =====================================================
     */

    const sectionEntries =
        Object.entries(sectionCounts)
        .sort(function(a, b) {
            return b[1] - a[1];
        });

    historicalChart.data.labels =
        sectionEntries.map(function(item) {
            return item[0];
        });

    historicalChart.data.datasets[0].data =
        sectionEntries.map(function(item) {
            return item[1];
        });

    historicalChart.update();


    /*
     * =====================================================
     * GRÁFICA 2
     * VISITAS POR FECHA Y COLOR POR SECCIÓN
     * =====================================================
     */

    const dates =
        Object.keys(dateSectionCounts).sort();


    /*
     * Obtener TODAS las secciones existentes
     */

    const sections = [];

    dates.forEach(function(date) {

        Object.keys(dateSectionCounts[date])
        .forEach(function(section) {

            if (sections.indexOf(section) === -1) {
                sections.push(section);
            }

        });

    });


    /*
     * =====================================================
     * COLOR FIJO PARA CADA SECCIÓN
     * =====================================================
     */

    const sectionColors = {

        "home": "#3b82f6",
        "Home": "#3b82f6",

        "experience": "#22c55e",
        "Experience": "#22c55e",

        "projects": "#f59e0b",
        "Projects": "#f59e0b",

        "skills": "#ef4444",
        "Skills": "#ef4444",

        "education": "#8b5cf6",
        "Education": "#8b5cf6",

        "contact": "#ec4899",
        "Contact": "#ec4899",

        "cv": "#06b6d4",
        "CV": "#06b6d4",

        "github": "#84cc16",
        "GitHub": "#84cc16",

        "linkedin": "#f97316",
        "LinkedIn": "#f97316"
    };


    /*
     * Colores adicionales para cualquier sección
     * que no esté arriba.
     */

    const extraColors = [
        "#3b82f6",
        "#22c55e",
        "#f59e0b",
        "#ef4444",
        "#8b5cf6",
        "#ec4899",
        "#06b6d4",
        "#84cc16",
        "#f97316",
        "#14b8a6",
        "#6366f1",
        "#e11d48",
        "#0ea5e9",
        "#a855f7",
        "#10b981"
    ];


    /*
     * =====================================================
     * CREAR UN DATASET POR CADA SECCIÓN
     * =====================================================
     */

    dailyChart.data.labels = dates;

    const activeSections = sections.filter(function(section) {

        return dates.some(function(date) {

            return (dateSectionCounts[date][section] || 0) > 0;

        });

    });


    dailyChart.data.datasets =
        activeSections.map(function(section, index) {

            let color =
                sectionColors[section];

            if (!color) {
                color =
                    extraColors[
                        index % extraColors.length
                    ];
            }


            return {

                label: section,

                data: dates.map(function(date) {

                    return (
                        dateSectionCounts[date][section] || 0
                    );

                }),

                backgroundColor: color,

                borderColor: color,

                borderWidth: 1,

                borderRadius: 3

            };

        });


    /*
     * Actualizar la gráfica
     */

    dailyChart.update();

    renderDailyLegend();

    

    
}








function renderDailyLegend()
{

    const legend =
        document.getElementById("dailyLegendExternal");

    if (!legend)
    {
        return;
    }

    legend.innerHTML = "";

    dailyChart.data.datasets.forEach(
        function(dataset, index)
        {

            const item =
                document.createElement("div");

            item.style.display = "flex";
            item.style.alignItems = "center";
            item.style.gap = "8px";
            item.style.marginBottom = "10px";
            item.style.cursor = "pointer";
            item.style.color = "#cbd5e1";

            const color =
                document.createElement("span");

            color.style.display = "inline-block";
            color.style.width = "12px";
            color.style.height = "12px";
            color.style.minWidth = "12px";
            color.style.borderRadius = "3px";
            color.style.backgroundColor =
                dataset.backgroundColor;

            const text =
                document.createElement("span");

            text.textContent =
                dataset.label || "Sin sección";

            text.style.lineHeight = "1.3";
            text.style.wordBreak = "break-word";

            item.appendChild(color);
            item.appendChild(text);

            item.onclick =
                function()
                {

                    const meta =
                        dailyChart.getDatasetMeta(index);

                    meta.hidden =
                        meta.hidden === null
                        ? !dailyChart.data.datasets[index].hidden
                        : null;

                    dailyChart.update();

                    item.style.opacity =
                        meta.hidden
                        ? "0.35"
                        : "1";
                };

            legend.appendChild(item);

        }
    );

}


function updateStats()
{

const total =
filteredRows.length;


const uniqueIps =
new Set(
filteredRows
.map(
function(row)
{
return (row.dataset.ip || "").trim();
}
)
);


const today =
new Date()
.toISOString()
.slice(0,10);


const todayCount =
filteredRows.filter(
function(row)
{
return (row.dataset.date || "") === today;
}
).length;


statFiltered.textContent =
total;

filterCount.textContent =
total;


if (!filterIp.value &&
!filterSection.value &&
!filterDate.value)
{

statTotal.textContent =
total;

statIps.textContent =
uniqueIps.size;

statToday.textContent =
todayCount;

}

}


/* =========================================================
   TABLE
   ========================================================= */

function renderTable()
{

const total =
filteredRows.length;


const totalPages =
Math.max(
1,
Math.ceil(
total / rowsPerPage
)
);


if (currentPage > totalPages)
{
currentPage = totalPages;
}


const start =
(currentPage - 1) *
rowsPerPage;


const end =
start + rowsPerPage;


rows.forEach(
function(row)
{
row.style.display = "none";
}
);


filteredRows
.slice(start,end)
.forEach(
function(row)
{
row.style.display = "";
}
);


if (total === 0)
{

paginationInfo.textContent =
"No hay registros";

}
else
{

paginationInfo.textContent =
"Mostrando " +
(start + 1) +
" - " +
Math.min(end,total) +
" de " +
total;

}


pageInfo.textContent =
"Página " +
currentPage +
" de " +
totalPages;


previousPage.disabled =
currentPage <= 1;


nextPage.disabled =
currentPage >= totalPages;

}


/* =========================================================
   FILTERS
   ========================================================= */

function applyFilters()
{

const ip =
filterIp.value
.trim()
.toLowerCase();

const section =
filterSection.value
.trim()
.toLowerCase();

const date =
filterDate.value
.trim();


filteredRows =
rows.filter(
function(row)
{

const rowIp =
(row.dataset.ip || "")
.trim()
.toLowerCase();

const rowSection =
(row.dataset.section || "")
.trim()
.toLowerCase();

const rowDate =
(row.dataset.date || "")
.trim();


const matchIp =
!ip || rowIp === ip;

const matchSection =
!section || rowSection === section;

const matchDate =
!date || rowDate === date;


return (
matchIp &&
matchSection &&
matchDate
);

}
);


currentPage = 1;


updateStats();

updateCharts();

renderTable();

}


/* =========================================================
   EVENTS
   ========================================================= */

filterIp.addEventListener(
"change",
applyFilters
);

filterSection.addEventListener(
"change",
applyFilters
);

filterDate.addEventListener(
"change",
applyFilters
);


clearFilters.addEventListener(
"click",
function()
{

filterIp.value = "";

filterSection.value = "";

filterDate.value = "";

applyFilters();

}
);


/* =========================================================
   PAGINATION
   ========================================================= */

previousPage.addEventListener(
"click",
function()
{

if (currentPage > 1)
{

currentPage--;

renderTable();

}

}
);


nextPage.addEventListener(
"click",
function()
{

const totalPages =
Math.max(
1,
Math.ceil(
filteredRows.length /
rowsPerPage
)
);


if (currentPage < totalPages)
{

currentPage++;

renderTable();

}

}
);


/* =========================================================
   INITIAL LOAD
   ========================================================= */

applyFilters();

});

</script>





<script>

</script>

</body>

</html>
"""

        page = page.replace(
            "__TOTAL_VISITAS__",
            str(total_visitas)
        )

        page = page.replace(
            "__IPS_UNICAS__",
            str(ips_unicas)
        )

        page = page.replace(
            "__VISITAS_HOY__",
            str(visitas_hoy)
        )

        page = page.replace(
            "__IP_OPTIONS__",
            ip_options
        )

        page = page.replace(
            "__SECTION_OPTIONS__",
            section_options
        )

        page = page.replace(
            "__DATE_OPTIONS__",
            date_options
        )

        page = page.replace(
            "__ROWS_HTML__",
            rows_html
        )

        return HTMLResponse(content=page)

    finally:
        conn.close()
