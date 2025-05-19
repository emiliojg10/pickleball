# 🎾 Pickleball - Sistema de Reservas de Pistas

Aplicación web desarrollada con **Angular (frontend)**, **FastAPI (backend)** y **Firebase Firestore (base de datos)** para gestionar reservas de pistas de pickleball. Permite a los usuarios consultar la disponibilidad, hacer reservas y recibir confirmación por correo electrónico.

---

## 📁 Estructura del Proyecto

```
pickleball-backend/
│
├── main.py                      # API REST con FastAPI
├── models.py                   # Modelos de datos con Pydantic
├── requirements.txt            # Dependencias backend
├── .gitignore                  # Exclusiones de Git
├── Dockerfile                  # Imagen Docker opcional
├── credentials/
│   └── firestore-credentials.json 
└── pickleball-frontend/
    ├── angular.json
    ├── package.json
    ├── src

```

---

## 🚀 Tecnologías Usadas

- **Frontend**: Angular 17
- **Backend**: FastAPI (Python 3.10)
- **Base de datos**: Firebase Firestore
- **Correo**: SMTP Gmail
- **Despliegue**: Firebase Hosting + Google Cloud Run

---

## ⚙️ Configuración del Proyecto

### 1. Clona el repositorio

```bash
git clone https://github.com/emiliojg10/pickleball.git
cd pickleball
```

---

### 2. Backend (FastAPI)

#### Crear entorno virtual

```bash
python -m venv venv
venv\Scripts\activate
```

#### Instalar dependencias

```bash
pip install -r requirements.txt
```

#### Ejecutar backend

```bash
uvicorn main:app --reload
```

---

### 3. Frontend (Angular)

```bash
cd pickleball-frontend
npm install
ng serve
```


## 📬 Envío de Correos

El sistema envía automáticamente un email de confirmación al usuario cuando realiza una reserva.

---


## 📦 Despliegue

- **Frontend** desplegado con [Firebase Hosting](https://firebase.google.com/).
- **Backend** desplegado en [Google Cloud Run](https://cloud.google.com/run).


---

## 📘 Licencia

Este proyecto es solo con fines educativos.

---

## ✍️ Autor

- Emilio Jiménez González — [GitHub](https://github.com/emiliojg10)
