const axios = require('axios');

const elevenLabsService = {
  /**
   * Generates a health feedback voice message
   * @param {string} text - The feedback text to speak
   * @returns {Promise<Buffer>} - Audio data
   */
  generateSpeech: async (text) => {
    try {
      const apiKey = process.env.ELEVENLABS_API_KEY;
      const voiceId = process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM'; // Default voice

      if (!apiKey) {
        console.warn('ELEVENLABS_API_KEY missing. Returning null.');
        return null;
      }

      const response = await axios.post(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        },
        {
          headers: {
            'xi-api-key': apiKey,
            'Content-Type': 'application/json'
          },
          responseType: 'arraybuffer'
        }
      );

      return response.data;
    } catch (error) {
      console.error('ElevenLabs Error:', error.response?.data || error.message);
      return null; // Fail gracefully
    }
  }
};

module.exports = elevenLabsService;
