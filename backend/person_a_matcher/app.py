import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from shared.eligibility_engine import load_schemes, check_eligibility
from fastapi import FastAPI, UploadFile, File
import json
import os
from dotenv import load_dotenv
from pathlib import Path
from sarvamai import SarvamAI
from sarvamai.play import save

load_dotenv(
    dotenv_path=Path(__file__).resolve().parent / ".env"
)
sarvam_client = SarvamAI(api_subscription_key=os.getenv("SARVAM_API_KEY"))

app = FastAPI()


def text_to_speech(text, language_code="hi-IN"):
    response = sarvam_client.text_to_speech.convert(
        text=text,
        language_code=language_code,
        model="bulbul:v3",
        speaker="anand"
    )
    save(response, "response_audio.wav")
    return "response_audio.wav"

def speech_to_text(audio_file_path, language_code="hi-IN"):
    with open(audio_file_path, "rb") as f:
        response = sarvam_client.speech_to_text.transcribe(
            file=f,
            language_code=language_code
        )
    return response.transcript

@app.get("/")
def read_root():
    return {"message": "Backend is running"}

@app.get("/schemes")
def get_schemes():
    schemes = load_schemes()
    return schemes

@app.get("/match")
def match_schemes(age: int, income: int, occupation: str, state: str):
    user = {
        "age": age,
        "income": income,
        "occupation": occupation,
        "state": state
    }
    schemes = load_schemes()
    matched = [s for s in schemes if check_eligibility(user, s)]
    return matched

@app.post("/speak")
def speak(text: str, language_code: str = "hi-IN"):
    audio_path = text_to_speech(text, language_code)
    return {"message": "Audio generated", "file": audio_path}

@app.post("/listen")
def listen(file: UploadFile = File(...), language_code: str = "hi-IN"):
    temp_path = "temp_upload.wav"
    with open(temp_path, "wb") as f:
        f.write(file.file.read())
    transcript = speech_to_text(temp_path, language_code)
    return {"transcript": transcript}