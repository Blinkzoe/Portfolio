import os
import sqlite3

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