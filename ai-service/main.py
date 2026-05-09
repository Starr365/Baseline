from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import random

app = FastAPI(title="Baseline AI Service")

class SignalData(BaseModel):
    voice_data: list = []
    motor_data: list = []
    cognitive_data: list = []
    face_data: list = []

@app.get("/")
async def root():
    return {"message": "Baseline AI Service is online"}

@app.post("/analyze")
async def analyze_signals(data: SignalData):
    # Simulated signal processing
    # In a real scenario, this would load ML models and process raw signals
    
    voice_score = random.uniform(0, 100)
    motor_score = random.uniform(0, 100)
    cognitive_score = random.uniform(0, 100)
    face_score = random.uniform(0, 100)
    
    return {
        "voice_score": voice_score,
        "motor_score": motor_score,
        "cognitive_score": cognitive_score,
        "face_score": face_score
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
