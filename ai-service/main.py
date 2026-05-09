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
    # In a real production scenario, these would involve feature extraction from the blobs/data
    # Here we simulate the extraction but follow the weighted scoring logic from docs.md
    
    # 1. Voice (30%) - Simulated analysis of vocal biomarkers
    voice_score = random.uniform(70, 95) 
    
    # 2. Motor (25%) - Analysis of tap reaction timings
    # Average reaction time calculation
    if data.motor_data:
        avg_reaction = sum(data.motor_data) / len(data.motor_data)
        motor_score = max(0, 100 - (avg_reaction / 10)) # Simple inverse mapping
    else:
        motor_score = 0
        
    # 3. Cognition (25%) - Direct score from mini-game
    cognitive_score = min(100, data.cognitive_data[0] if data.cognitive_data else 0)
    
    # 4. Facial (20%) - Simulated mesh symmetry analysis
    face_score = random.uniform(75, 98)
    
    # Weighted Health Drift Score
    final_score = (
        (voice_score * 0.30) +
        (motor_score * 0.25) +
        (cognitive_score * 0.25) +
        (face_score * 0.20)
    )
    
    return {
        "final_score": round(final_score, 2),
        "breakdown": {
            "voice": round(voice_score, 2),
            "motor": round(motor_score, 2),
            "cognitive": round(cognitive_score, 2),
            "facial": round(face_score, 2)
        },
        "risk_level": "Optimal" if final_score > 80 else "Mild Drift" if final_score > 60 else "Elevated"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
