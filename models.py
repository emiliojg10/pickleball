from pydantic import BaseModel

class Reserva(BaseModel):
    fecha: str
    hora: str
    pista: str
    email: str