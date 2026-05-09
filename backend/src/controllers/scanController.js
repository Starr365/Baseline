const { calculateHealthDrift } = require('../services/scoringService');
const axios = require('axios');

const processScan = async (req, res) => {
  try {
    const { voiceData, motorData, cognitiveData, faceData, walletAddress } = req.body;

    // In a real app, we'd send raw data to the AI service
    // const aiResponse = await axios.post(process.env.AI_SERVICE_URL + '/analyze', {
    //   voice_data: voiceData,
    //   motor_data: motorData,
    //   cognitive_data: cognitiveData,
    //   face_data: faceData
    // });
    // const { voice_score, motor_score, cognitive_score, face_score } = aiResponse.data;

    // For demo, we simulate AI scores or use provided ones
    const signals = {
      voice: Math.random() * 100,
      motor: Math.random() * 100,
      cognition: Math.random() * 100,
      face: Math.random() * 100
    };

    const result = calculateHealthDrift(signals);
    
    // Store in DB (mocked)
    const scanRecord = {
      id: Math.random().toString(36).substr(2, 9),
      walletAddress,
      ...result,
      signals
    };

    res.json(scanRecord);
  } catch (error) {
    console.error('Scan processing error:', error);
    res.status(500).json({ error: 'Failed to process health scan' });
  }
};

module.exports = { processScan };
