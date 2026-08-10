import sys
import os

sys.path.append(
    os.path.join(
        os.path.dirname(os.path.abspath(__file__)),
        "person_a_matcher"
    )
)

sys.path.append(
    os.path.join(
        os.path.dirname(os.path.abspath(__file__)),
        "person_b_chat"
    )
)

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from routes.chat import router as chat_router
from routes.pdf import router as pdf_router

import app as matcher_app


app = FastAPI(title="Digital Citizen Assistant - Yojnafy")


# CORS — allows the React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include routers
app.include_router(chat_router)
app.include_router(pdf_router)


@app.get("/")
def read_root():
    return {"message": "Yojnafy backend is running"}


@app.get("/schemes")
def get_schemes():
    return matcher_app.load_schemes()


@app.get("/match")
def match_schemes(
    age: int,
    income: int,
    occupation: str,
    state: str,
    intent: str,
    category: str
):
    user = {
        "age": age,
        "income": income,
        "occupation": occupation,
        "state": state,
        "intent": intent,
        "category": category
    }

    schemes = matcher_app.load_schemes()

    return [
        s for s in schemes
        if matcher_app.check_eligibility(user, s)
    ]


@app.post("/speak")
def speak(text: str, language_code: str = "hi-IN"):
    audio_path = matcher_app.text_to_speech(
        text,
        language_code
    )

    return {
        "message": "Audio generated",
        "file": audio_path
    }


@app.post("/listen")
def listen(
    file: UploadFile = File(...),
    language_code: str = "hi-IN"
):
    temp_path = "temp_upload.wav"

    with open(temp_path, "wb") as f:
        f.write(file.file.read())

    transcript = matcher_app.speech_to_text(
        temp_path,
        language_code
    )

    return {
        "transcript": transcript
    }