const axios = require('axios');
const ipfsService = require('../services/ipfsService');
const solanaService = require('../services/solanaService');
const elevenLabsService = require('../services/elevenLabsService');
const historyService = require('../services/historyService');

const processScan = async (req, res) => {
  try {
    const { voiceData, motorData, cognitiveData, faceData, walletAddress } = req.body;

    const aiResponse = await axios.post((process.env.AI_SERVICE_URL || 'http://localhost:8000') + '/analyze', {
      voice_data: [], 
      motor_data: motorData || [],
      cognitive_data: [cognitiveData] || [],
      face_data: []
    });

    const { final_score, breakdown, risk_level } = aiResponse.data;
    
    // 1. Upload metadata to IPFS
    const ipfsHash = await ipfsService.uploadMetadata({
      walletAddress,
      totalScore: final_score,
      breakdown,
      riskCategory: risk_level,
      timestamp: Date.now()
    });

    // 2. Anchor on Solana
    const txSignature = await solanaService.logScanOnChain(walletAddress, ipfsHash);

    // 3. Generate Voice Feedback
    const feedbackText = `Your Baseline scan is complete. Your Health Drift Score is ${final_score}, which indicates an ${risk_level} status. All metadata has been anchored to Solana.`;
    const audioBuffer = await elevenLabsService.generateSpeech(feedbackText);
    
    const scanRecord = {
      id: Math.random().toString(36).substr(2, 9),
      walletAddress,
      totalScore: final_score,
      riskCategory: risk_level,
      breakdown,
      ipfsHash,
      txSignature,
      feedbackText,
      audioBase64: audioBuffer ? audioBuffer.toString('base64') : null,
      timestamp: Date.now()
    };

    // Save to history
    historyService.saveScan(scanRecord);

    res.json(scanRecord);
  } catch (error) {
    console.error('Scan processing error:', error);
    res.status(500).json({ error: 'Failed to process health scan' });
  }
};

const getHistory = async (req, res) => {
  try {
    const { walletAddress } = req.query;
    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }
    const history = historyService.getHistoryByWallet(walletAddress);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};

module.exports = { processScan, getHistory };
