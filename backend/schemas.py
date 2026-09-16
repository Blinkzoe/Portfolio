from typing import Optional
from pydantic import BaseModel


class TrackRequest(BaseModel):
  section: str
  page: Optional[str] = "No especificada"