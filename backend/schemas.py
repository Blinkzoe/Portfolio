from pydantic import BaseModel

class TrackRequest(BaseModel):
    section: str = "Página Principal / Visita"