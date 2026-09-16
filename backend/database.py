import os
import sqlite3

DB_PATH = "/app/data/database.db"


def init_db():
  os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
  conn = sqlite3.connect(DB_PATH)
  cursor = conn.cursor()

  # Creamos la tabla base si no existe
  cursor.execute("""
        CREATE TABLE IF NOT EXISTS clicks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            section TEXT,
            ip TEXT,
            user_agent TEXT,
            timestamp TEXT
        )
    """)

  # Lista con todas las columnas de control y analíticas
  nuevas_columnas = [
      "user_agent",
      "timestamp",
      "section",
      "ip",
      "country",
      "region",
      "city",
      "zip",
      "lat",
      "lon",
      "isp",
      "org",
      "asn",
      "asname",
      "timezone",
      "device",
      "browser",
      "os_name",
      "referer",
      "accept_language",
  ]

  # Intentamos agregar cada columna si no existe en tablas previas
  for col in nuevas_columnas:
    try:
      col_type = (
          "REAL"
          if col in ("lat", "lon")
          else ("INTEGER" if col == "id" else "TEXT")
      )
      cursor.execute(f"ALTER TABLE clicks ADD COLUMN {col} {col_type};")
    except Exception:
      pass

  conn.commit()
  conn.close()