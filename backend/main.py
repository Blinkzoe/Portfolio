from fastapi import FastAPI, Request, Depends, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
import sqlite3
import os
import httpx
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
security = HTTPBasic()

ADMIN_USER = os.getenv("ADMIN_USER")
ADMIN_PASS = os.getenv("ADMIN_PASS")

DB_PATH = "/app/data/database.db"

def init_db():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS clicks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            section TEXT,
            ip TEXT,
            user_agent TEXT,
            timestamp TEXT
        )
    """)
    for col in ["user_agent", "timestamp", "section", "ip"]:
        try:
            cursor.execute(f"ALTER TABLE clicks ADD COLUMN {col} TEXT;")
        except Exception:
            pass
    conn.commit()
    conn.close()

init_db()

class TrackRequest(BaseModel):
    section: str = "Página Principal / Visita"


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

async def get_ip_info(ip: str):
    if not ip or ip in ("127.0.0.1", "localhost", "::1") or ip.startswith("192.168.") or ip.startswith("10."):
        return {
            "country": "Red Local", "region": "Local", "city": "Local", "zip": "-",
            "lat": 0, "lon": 0, "isp": "Red Privada", "org": "Local Network",
            "asn": "-", "asname": "-", "timezone": "America/Mexico_City"
        }
    try:
        async with httpx.AsyncClient(timeout=1.5) as client:
            resp = await client.get(f"http://ip-api.com/json/{ip}?fields=status,country,regionName,city,zip,lat,lon,isp,org,as,timezone")
            if resp.status_code == 200:
                data = resp.json()
                if data.get("status") == "success":
                    as_full = data.get("as", "")
                    as_parts = as_full.split(" ", 1) if as_full else ["-", "-"]
                    return {
                        "country": data.get("country", "-"),
                        "region": data.get("regionName", "-"),
                        "city": data.get("city", "-"),
                        "zip": data.get("zip", "-"),
                        "lat": data.get("lat", 0),
                        "lon": data.get("lon", 0),
                        "isp": data.get("isp", "-"),
                        "org": data.get("org", "-"),
                        "asn": as_parts[0] if len(as_parts) > 0 else "-",
                        "asname": as_parts[1] if len(as_parts) > 1 else "-",
                        "timezone": data.get("timezone", "-")
                    }
    except Exception:
        pass
    return {
        "country": "-", "region": "-", "city": "-", "zip": "-",
        "lat": 0, "lon": 0, "isp": "-", "org": "-", "asn": "-", "asname": "-", "timezone": "-"
    }

def parse_user_agent(ua: str):
    if not ua:
        return "Desconocido", "Desconocido", "Desconocido"
    device = "Desktop"
    if "Mobile" in ua or "Android" in ua or "iPhone" in ua:
        device = "Móvil"
    elif "Tablet" in ua or "iPad" in ua:
        device = "Tablet"

    browser = "Desconocido"
    if "Chrome/" in ua and "Edg/" not in ua:
        try:
            b_ver = ua.split("Chrome/")[1].split(" ")[0].split(".")[0]
            browser = f"Chrome {b_ver}"
        except Exception:
            browser = "Chrome"
    elif "Firefox/" in ua:
        browser = "Firefox"
    elif "Safari/" in ua and "Chrome" not in ua:
        browser = "Safari"
    elif "Edg/" in ua:
        browser = "Edge"

    os_name = "Desconocido"
    if "Windows NT 10" in ua or "Windows" in ua:
        os_name = "Windows"
    elif "Android" in ua:
        os_name = "Android"
    elif "iPhone" in ua or "iPad" in ua or "Macintosh" in ua:
        os_name = "Apple / iOS"
    elif "Linux" in ua:
        os_name = "Linux"

    return device, browser, os_name

@app.post("/track")
async def track_click(data: TrackRequest, request: Request):
    try:
        section = data.section
        forwarded = request.headers.get("x-forwarded-for")
        if forwarded:
            client_ip = forwarded.split(',')[0].strip()
        elif request.client:
            client_ip = request.client.host
        else:
            client_ip = "127.0.0.1"
            
        user_agent = request.headers.get("user-agent", "Desconocido")
        
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("INSERT INTO clicks (section, ip, user_agent, timestamp) VALUES (?, ?, ?, ?)", 
                       (section, client_ip, user_agent, datetime.now().isoformat()))
        conn.commit()
        conn.close()
        return {"status": "success"}
    except Exception as e:
        return {"status": "error", "detail": str(e)}

@app.get("/analytics", response_class=HTMLResponse)
async def get_analytics(username: str = Depends(verify_credentials)):
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("SELECT id, section, ip, user_agent, timestamp FROM clicks ORDER BY id DESC LIMIT 50")
        rows = cursor.fetchall()
        
        total_visitas = len(rows)
        ips_unicas = len(set(row[2] for row in rows if row[2]))
        
        now = datetime.now()
        hoy_str = now.strftime("%Y-%m-%d")
        hace_24h = now - timedelta(hours=24)
        
        visitas_hoy = 0
        visitas_24h = 0
        
        secciones_historico = {}
        secciones_diarias = {}

        rows_html = ""
        for row in rows:
            row_id, sec_val, ip_val, ua_val, ts_val = row
            section_text = sec_val if sec_val else "Visita General"
            
            dt_str = ts_val or ""
            try:
                dt = datetime.fromisoformat(dt_str)
                dt_formatted = dt.strftime("%d/%m/%Y, %I:%M:%S %p")
                fecha_dia = dt.strftime("%Y-%m-%d")
                
                if fecha_dia == hoy_str:
                    visitas_hoy += 1
                if dt >= hace_24h:
                    visitas_24h += 1
                
                if fecha_dia not in secciones_diarias:
                    secciones_diarias[fecha_dia] = {}
                secciones_diarias[fecha_dia][section_text] = secciones_diarias[fecha_dia].get(section_text, 0) + 1

            except Exception:
                dt_formatted = dt_str
                fecha_dia = "Desconocido"

            secciones_historico[section_text] = secciones_historico.get(section_text, 0) + 1

            raw_ip = ip_val if ip_val else "127.0.0.1"
            ip = raw_ip.split(',')[0].strip()
            ua = ua_val if ua_val else ""
            device, browser, os_name = parse_user_agent(ua)
            ip_info = await get_ip_info(ip)
            
            lat = ip_info.get('lat', 0)
            lon = ip_info.get('lon', 0)
            has_coords = lat != 0 and lat != "0" and lon != 0 and lon != "0"
            
            coords_display = f"{lat}, {lon}" if has_coords else "-"
            map_link = f"<a href='https://www.google.com/maps?q={lat},{lon}' target='_blank' class='text-pink-400 hover:underline block text-[11px]'>📍 Ver mapa</a>" if has_coords else ""

            rows_html += f"""
            <tr class='border-b border-slate-800/60 hover:bg-slate-900/40 text-xs'>
                <td class='py-3 px-4 text-slate-300 font-mono'>{dt_formatted}</td>
                <td class='py-3 px-4 font-mono text-cyan-400 font-semibold'>{ip}</td>
                <td class='py-3 px-4 text-slate-300'>{ip_info.get('country', '-')}</td>
                <td class='py-3 px-4 text-slate-300'>{ip_info.get('region', '-')}</td>
                <td class='py-3 px-4 text-slate-300'>{ip_info.get('city', '-')}</td>
                <td class='py-3 px-4 text-slate-300'>{ip_info.get('zip', '-')}</td>
                <td class='py-3 px-4 font-mono text-slate-300'>{coords_display} {map_link}</td>
                <td class='py-3 px-4 text-slate-400'>{ip_info.get('isp', '-')}</td>
                <td class='py-3 px-4 text-slate-400'>{ip_info.get('org', '-')}</td>
                <td class='py-3 px-4 font-mono text-slate-400'>{ip_info.get('asn', '-')}</td>
                <td class='py-3 px-4 font-mono text-slate-400'>{ip_info.get('asname', '-')}</td>
                <td class='py-3 px-4 text-slate-400'>{ip_info.get('timezone', '-')}</td>
                <td class='py-3 px-4 text-pink-400 font-bold bg-pink-950/20 px-2 py-1 rounded'>{section_text}</td>
                <td class='py-3 px-4 text-slate-300'>{device}</td>
                <td class='py-3 px-4 text-slate-300'>{browser}</td>
                <td class='py-3 px-4 text-slate-300'>{os_name}</td>
            </tr>
            """
        conn.close()

        hist_labels = list(secciones_historico.keys())
        hist_data = list(secciones_historico.values())
        
        import json
        html_content = f"""
        <!DOCTYPE html>
        <html lang="es" class="dark">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Panel de Estadísticas - Orlando Morales</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        </head>
        <body class="bg-slate-950 text-slate-100 min-h-screen p-6 md:p-10 font-sans">
            <div class="max-w-[95%] mx-auto space-y-8">
                <header class="text-center space-y-2 border-b border-slate-800 pb-6">
                    <h1 class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400">
                        📊 Panel de Analíticas y Clics
                    </h1>
                    <p class="text-xs text-slate-400">Control de tráfico, rendimiento de secciones y geolocalización de visitantes.</p>
                </header>

                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                    <div class="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl">
                        <span class='text-xs text-slate-400 block uppercase tracking-wider font-semibold'>Registros (Últimos 50)</span>
                        <span class='text-3xl font-extrabold text-white mt-2 block'>{total_visitas}</span>
                    </div>
                    <div class="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl">
                        <span class='text-xs text-slate-400 block uppercase tracking-wider font-semibold'>IPs Únicas</span>
                        <span class='text-3xl font-extrabold text-white mt-2 block'>{ips_unicas}</span>
                    </div>
                    <div class="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl">
                        <span class='text-xs text-slate-400 block uppercase tracking-wider font-semibold'>Hoy</span>
                        <span class='text-3xl font-extrabold text-white mt-2 block'>{visitas_hoy}</span>
                    </div>
                    <div class="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-xl">
                        <span class='text-xs text-slate-400 block uppercase tracking-wider font-semibold'>Últimas 24 horas</span>
                        <span class='text-3xl font-extrabold text-white mt-2 block'>{visitas_24h}</span>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-2xl">
                        <h3 class="text-sm font-bold text-pink-400 mb-4 uppercase tracking-wider">📈 Clics Totales por Sección (Histórico)</h3>
                        <div class="relative h-72">
                            <canvas id="historicalChart"></canvas>
                        </div>
                    </div>
                    <div class="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-2xl">
                        <h3 class="text-sm font-bold text-cyan-400 mb-4 uppercase tracking-wider">📅 Actividad Diaria por Sección (Últimos Días)</h3>
                        <div class="relative h-72">
                            <canvas id="dailyChart"></canvas>
                        </div>
                    </div>
                </div>

                <div class="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
                    <h3 class="text-sm font-bold text-slate-300 uppercase tracking-wider">📋 Historial Detallado de Conexiones</h3>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left whitespace-nowrap">
                            <thead>
                                <tr class="border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                                    <th class="py-3 px-4">Fecha y Hora</th>
                                    <th class="py-3 px-4">Dirección IP</th>
                                    <th class="py-3 px-4">País</th>
                                    <th class="py-3 px-4">Estado</th>
                                    <th class="py-3 px-4">Ciudad</th>
                                    <th class="py-3 px-4">C.P.</th>
                                    <th class="py-3 px-4">Coordenadas</th>
                                    <th class="py-3 px-4">ISP</th>
                                    <th class="py-3 px-4">Organización</th>
                                    <th class="py-3 px-4">ASN</th>
                                    <th class="py-3 px-4">AS Name</th>
                                    <th class="py-3 px-4">Zona horaria</th>
                                    <th class="py-3 px-4">Acción / Sección</th>
                                    <th class="py-3 px-4">Dispositivo</th>
                                    <th class="py-3 px-4">Navegador</th>
                                    <th class="py-3 px-4">Sistema operativo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows_html if rows_html else "<tr><td colspan='16' class='py-8 text-center text-slate-500 text-xs'>No hay registros todavía.</td></tr>"}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <script>
                const histLabels = {json.dumps(hist_labels)};
                const histData = {json.dumps(hist_data)};
                
                const ctxHist = document.getElementById('historicalChart').getContext('2d');
                new Chart(ctxHist, {{
                    type: 'bar',
                    data: {{
                        labels: histLabels,
                        datasets: [{{
                            label: 'Clics Históricos',
                            data: histData,
                            backgroundColor: '#ec4899',
                            borderRadius: 6
                        }}]
                    }},
                    options: {{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {{ legend: {{ display: false }} }},
                        scales: {{
                            x: {{ ticks: {{ color: '#94a3b8', font: {{ size: 10 }} }}, grid: {{ display: false }} }},
                            y: {{ ticks: {{ color: '#94a3b8', font: {{ size: 10 }}, precision: 0 }}, grid: {{ color: '#1e293b' }} }}
                        }}
                    }}
                }});

                const dailyDates = {json.dumps([(now - timedelta(days=i)).strftime("%Y-%m-%d") for i in range(6, -1, -1)])};
                const rawDailyData = {json.dumps(secciones_diarias)};
                const allSections = {json.dumps(list(secciones_historico.keys()))};
                const palette = ['#ec4899', '#38bdf8', '#c084fc', '#34d399', '#fbbf24', '#fb8500', '#a78bfa'];

                const dailyDatasets = allSections.map((sec, index) => {{
                    const dataPoints = dailyDates.map(date => {{
                        return (rawDailyData[date] && rawDailyData[date][sec]) ? rawDailyData[date][sec] : 0;
                    }});
                    return {{
                        label: sec,
                        data: dataPoints,
                        backgroundColor: palette[index % palette.length],
                        borderRadius: 4
                    }};
                }});

                const ctxDaily = document.getElementById('dailyChart').getContext('2d');
                new Chart(ctxDaily, {{
                    type: 'bar',
                    data: {{
                        labels: dailyDates,
                        datasets: dailyDatasets
                    }},
                    options: {{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {{
                            legend: {{ labels: {{ color: '#cbd5e1', font: {{ size: 11 }} }} }}
                        }},
                        scales: {{
                            x: {{ stacked: true, ticks: {{ color: '#94a3b8', font: {{ size: 10 }} }}, grid: {{ display: false }} }},
                            y: {{ stacked: true, ticks: {{ color: '#94a3b8', font: {{ size: 10 }}, precision: 0 }}, grid: {{ color: '#1e293b' }} }}
                        }}
                    }}
                }});
            </script>
        </body>
        </html>
        """
        return HTMLResponse(content=html_content)
    except Exception as e:
        return HTMLResponse(content=f"<h1>Error interno en Analytics: {str(e)}</h1>", status_code=500)

@app.get("/")
async def root():
    return {"message": "Backend de FastAPI funcionando correctamente"}
