const express = require("express");
const router = express.Router();
const axios = require("axios");

const COMPILER_BACKEND_URL = `${process.env.JUDGE_BACKEND_URL}/run`;

router.post("/", async (req, res) => {
    const { code, input, language } = req.body;

    try {
        const response = await axios.post(COMPILER_BACKEND_URL, {
            code,
            input,
            language,
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error calling compiler backend:", error.message);
        res.status(500).json({
            success: false,
            error: error.response?.data?.error || "Compiler backend failed",
        });
    }
});

module.exports = router;
