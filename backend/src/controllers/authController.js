const jwt = require('jsonwebtoken');
const nacl = require('tweetnacl');
const bs58 = require('bs58');
const { PublicKey } = require('@solana/web3.js');

const authController = {
  // Login with Solana Wallet
  walletLogin: async (req, res) => {
    try {
      const { publicKey, signature, message } = req.body;

      if (!publicKey || !signature || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Verify the signature
      const signatureUint8 = bs58.decode(signature);
      const messageUint8 = new TextEncoder().encode(message);
      const publicKeyUint8 = bs58.decode(publicKey);

      const verified = nacl.sign.detached.verify(
        messageUint8,
        signatureUint8,
        publicKeyUint8
      );

      if (!verified) {
        return res.status(401).json({ error: 'Invalid signature' });
      }

      // Create JWT
      const token = jwt.sign(
        { publicKey },
        process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: '24h' }
      );

      res.json({
        success: true,
        token,
        user: { publicKey }
      });
    } catch (error) {
      console.error('Wallet Login Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Mock Email Login (as placeholder for magic links)
  emailLogin: async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });

    const token = jwt.sign({ email }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '24h' });
    res.json({ success: true, token, user: { email } });
  }
};

module.exports = authController;
