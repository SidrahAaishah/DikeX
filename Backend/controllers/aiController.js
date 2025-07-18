// controllers/aiController.js
const axios = require('axios');

const COMPILER_BACKEND_URL = process.env.JUDGE_BACKEND_URL;

const handleGenieRequest = async (req, res) => {
  try {
    const { problemStatement, type } = req.body;

    if (!problemStatement || !type) {
      return res.status(400).json({ success: false, error: 'Missing problemStatement or type' });
    }

    const response = await axios.post(`${COMPILER_BACKEND_URL}/genieExplain`, {
      problemStatement,
      type,
    });

    res.json(response.data);
  } catch (err) {
    console.error('Proxy error to compiler backend:', err.message);
    res.status(500).json({ success: false, error: 'Compiler backend failed' });
  }
};

module.exports = { handleGenieRequest };
