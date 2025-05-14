import os
import uvicorn
from fastapi import FastAPI, HTTPException, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
import firebase_admin
from firebase_admin import credentials, firestore
import smtplib
from email.mime.text import MIMEText
from models import Reserva
from dotenv import load_dotenv
load_dotenv()

# Inicializar FastAPI
app = FastAPI()

# Inicializar Firebase
cred = credentials.Certificate("credentials/firestore-credentials.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://pickleball-d9a43.web.app",
        "https://pickleball-d9a43.firebaseapp.com",
        "https://pickleball-backend-166360916137.us-central1.run.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Definición de funciones
def enviar_correo_confirmacion(reserva: Reserva):
    remitente = "emiliojg9@gmail.com"
    destinatario = reserva.email
    asunto = "Confirmación de tu reserva de pista"
    cuerpo = f"""
    Hola,

    Tu reserva se ha realizado con éxito:

    📅 Fecha: {reserva.fecha}
    ⏰ Hora: {reserva.hora}
    🏟️ Pista: {reserva.pista}

    ¡Gracias por usar nuestro sistema de reservas!

    Saludos,
    Tu Club de Pickleball
    """

    msg = MIMEText(cuerpo)
    msg["Subject"] = asunto
    msg["From"] = remitente
    msg["To"] = destinatario

    smtp_password = os.getenv("SMTP_PASSWORD")
    if not smtp_password:
        print("❌ ERROR: No se ha encontrado la variable SMTP_PASSWORD en el entorno.")
        return

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as servidor:
            servidor.starttls()
            servidor.login(remitente, smtp_password)
            servidor.sendmail(remitente, [destinatario], msg.as_string())
    except Exception as e:
        print("Error al enviar el correo:", e)

# Rutas de API
@app.get("/")
async def root():
    return {"message": "¡Hola desde FastAPI y Firestore!"}

@app.post("/reservas/")
async def crear_reserva(reserva: Reserva):
    try:
        if not reserva.email:
            raise HTTPException(status_code=400, detail="El email es obligatorio para realizar la reserva.")

        reservas_ref = db.collection("reservas")

        # 🔒 Verificar si ya existe una reserva para ese usuario en la misma fecha
        reservas_existentes = reservas_ref.where("email", "==", reserva.email).where("fecha", "==", reserva.fecha).stream()
        if any(reservas_existentes):
            raise HTTPException(status_code=409, detail="Ya tienes una reserva para ese día.")

        # Guardar la reserva
        _, reserva_ref = reservas_ref.add(reserva.dict())

        # Actualizar disponibilidad
        disponibilidad_ref = db.collection("disponibilidad").document(reserva.fecha)
        doc = disponibilidad_ref.get()
        data = doc.to_dict() if doc.exists else {"horas": {}}

        if reserva.hora not in data["horas"]:
            data["horas"][reserva.hora] = {
                "pista1": True,
                "pista2": True,
                "pista3": True,
                "pista4": True,
            }

        pista_key = reserva.pista.lower().replace(" ", "")
        if not data["horas"][reserva.hora].get(pista_key, True):
            raise HTTPException(status_code=409, detail="La pista ya está reservada en esa hora.")

        data["horas"][reserva.hora][pista_key] = False
        disponibilidad_ref.set(data)

        # ✉️ Enviar correo de confirmación
        enviar_correo_confirmacion(reserva)

        return {"message": f"Reserva creada con ID: {reserva_ref.id}", "id": reserva_ref.id}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear la reserva: {str(e)}")

@app.get("/disponibilidad/")
async def obtener_disponibilidad(fecha: str = Query(..., description="Fecha para la que se solicita la disponibilidad (YYYY-MM-DD)")):
    try:
        disponibilidad_ref = db.collection("disponibilidad").document(fecha)
        doc = disponibilidad_ref.get()
        if doc.exists:
            return doc.to_dict()
        else:
            return {"horas": {}}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener la disponibilidad: {str(e)}")

# Servir Angular compilado desde FastAPI
frontend_path = "pickleball-frontend/dist/pickleball-frontend"

# Archivos estáticos
app.mount("/static", StaticFiles(directory=frontend_path), name="static")

# Catch-all route para SPA
@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    index_path = os.path.join(frontend_path, "index.html")
    return FileResponse(index_path)

# Ejecutar app
if __name__ == "__main__":
    port = int(os.getenv("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)
