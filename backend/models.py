import httpx


async def get_ip_info(ip: str):
  if (
      not ip
      or ip in ("127.0.0.1", "localhost", "::1")
      or ip.startswith("192.168.")
      or ip.startswith("10.")
  ):
    return {
        "country": "Red Local",
        "region": "Local",
        "city": "Local",
        "zip": "-",
        "lat": 0,
        "lon": 0,
        "isp": "Red Privada",
        "org": "Local Network",
        "asn": "-",
        "asname": "-",
        "timezone": "America/Mexico_City",
    }
  try:
    async with httpx.AsyncClient(timeout=1.5) as client:
      resp = await client.get(
          f"http://ip-api.com/json/{ip}?fields=status,country,regionName,city,zip,lat,lon,isp,org,as,timezone"
      )
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
              "timezone": data.get("timezone", "-"),
          }
  except Exception:
    pass
  return {
      "country": "-",
      "region": "-",
      "city": "-",
      "zip": "-",
      "lat": 0,
      "lon": 0,
      "isp": "-",
      "org": "-",
      "asn": "-",
      "asname": "-",
      "timezone": "-",
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