const axios = require('axios');

const ipfsService = {
  /**
   * Uploads health scan metadata to IPFS via Pinata
   * @param {Object} data - The scan metadata to store
   * @returns {Promise<string>} - The IPFS CID (Hash)
   */
  uploadMetadata: async (data) => {
    try {
      const pinataJwt = process.env.PINATA_JWT;
      if (!pinataJwt) {
        console.warn('PINATA_JWT missing. Returning mock CID.');
        return 'Qm' + Math.random().toString(36).substring(2, 46);
      }

      const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        {
          pinataContent: data,
          pinataMetadata: {
            name: `baseline_scan_${data.walletAddress || 'unknown'}_${Date.now()}`
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${pinataJwt}`
          }
        }
      );

      return response.data.IpfsHash;
    } catch (error) {
      console.error('IPFS Upload Error:', error.response?.data || error.message);
      console.warn('Falling back to mock CID for testing.');
      return 'Qm' + Math.random().toString(36).substring(2, 46);
    }
  }
};

module.exports = ipfsService;
