from dotenv import load_dotenv
import os
from sarvamai import SarvamAI

load_dotenv()
api_key = os.getenv("SARVAM_API_KEY")

client = SarvamAI(api_subscription_key=api_key)

with open("output.wav", "rb") as f:
    response = client.speech_to_text.transcribe(
        file=f,
        language_code="hi-IN"
    )

print("Transcribed text:", response.transcript)