const axios = require('axios');

const BACKEND_URL = 'http://localhost:5000';
const AI_URL = 'http://localhost:8000';

async function runTests() {
  console.log('--- STARTING INTEGRATION TESTS ---');

  // 1. Test AI Service
  try {
    console.log('\n[1] Testing AI Service directly...');
    const aiResponse = await axios.post(`${AI_URL}/analyze`, {
      voice_data: [],
      motor_data: [120, 140, 110, 130],
      cognitive_data: [95],
      face_data: []
    });
    console.log('AI Response:', JSON.stringify(aiResponse.data, null, 2));
    if (aiResponse.data.final_score > 0 && aiResponse.data.risk_level) {
      console.log('✅ AI Service Test: PASS');
    } else {
      console.log('❌ AI Service Test: FAIL (Missing data)');
    }
  } catch (err) {
    console.error('❌ AI Service Test: FAIL (Connection Error)', err.message);
  }

  // 2. Test Backend Scan Processing
  try {
    console.log('\n[2] Testing Backend Scan Processing...');
    const backendResponse = await axios.post(`${BACKEND_URL}/api/scan/process`, {
      voiceData: [],
      motorData: [150, 160, 145],
      cognitiveData: 88,
      faceData: "test_capture_data",
      walletAddress: "3dJZtqPfF9KKLaC1VpWVj8ZBttJUBFQYEc3DnbzZQhux"
    });
    console.log('Backend Response:', JSON.stringify(backendResponse.data, null, 2));
    
    const { totalScore, riskCategory, txSignature, ipfsHash } = backendResponse.data;
    if (totalScore && riskCategory && txSignature && ipfsHash) {
      console.log('✅ Backend API Test: PASS');
      console.log(`   Transaction Signature: ${txSignature}`);
      console.log(`   IPFS Hash: ${ipfsHash}`);
    } else {
      console.log('❌ Backend API Test: FAIL (Incomplete response)');
    }
  } catch (err) {
    console.error('❌ Backend API Test: FAIL (Connection Error)', err.message);
  }

  console.log('\n--- INTEGRATION TESTS COMPLETE ---');
}

runTests();
