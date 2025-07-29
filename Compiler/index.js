require('dotenv').config();
const http = require('http');
const express = require("express");
const cors = require('cors');
const generateFile = require("./generateFile");
const executeCpp = require("./executeCpp");
const executePython = require("./executePython");
const executeJava = require("./executeJava");
const generateInputFile = require('./generateInputFile');
const generateAiResponse = require('./generateAiResponse');
const genieExplanation = require('./genieExplanation');

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("hello world");
});

app.post("/run", async (req, res) => {
    const { code, input, language } = req.body;

    if (code === undefined || code.trim() === '') {
        return res.status(400).json({ success: false, error: "empty code body" });
    }

    // 👇 THIS IS THE UPDATED BLOCK 👇
    try {
        const filePath = generateFile(code, language);
        const inputFilePath = generateInputFile(input);
        let output;

        if (language === "cpp") {
            output = await executeCpp(filePath, inputFilePath);
        } else if (language === "py") {
            // FIX: Pass the input file path to Python execution
            output = await executePython(filePath, inputFilePath);
        } else {
            // FIX: Pass the input file path to Java execution
            output = await executeJava(filePath, inputFilePath);
        }

        res.json({ output });
    } catch (error) {
        // This will print the exact error to your terminal
        console.error("DETAILED EXECUTION ERROR :", error);

        // This sends a cleaner error message to the frontend
        let errorMessage = "An unknown execution error occurred.";
        if (typeof error === 'object' && error !== null) {
            errorMessage = error.details || error.error || error.message;
        }

        res.status(500).json({ success: false, error: errorMessage });
    }
});

app.post("/genieExplain", async (req, res) => {
    const { problemStatement, type } = req.body;

    if (!problemStatement || !type) {
        return res.status(400).json({ success: false, error: "Missing problemStatement or type" });
    }

    try {
        const response = await genieExplanation({ problemStatement, type });
        res.json({ success: true, response });
    } catch (err) {
        console.error("GenieExplain error:", err.message);
        res.status(500).json({ success: false, error: "Gemini failed to respond" });
    }
});

app.post("/ai-review", async (req, res) => {
    const { code, verdict, testResults } = req.body;

    if (typeof code !== 'string' || code.trim() === '') {
        return res.status(400).json({ success: false, error: "OOPS!! No valid code to review." });
    }

    try {
        const aiResponse = await generateAiResponse({ code, verdict, testResults });
        res.json({
            success: true,
            response: aiResponse
        });
    } catch (error) {
        console.error("Gemini error:", error.message);
        res.status(500).json({
            success: false,
            response: "Gemini couldn't generate a response at the moment."
        });
    }
});

http.createServer(app).listen(process.env.PORT, () => {
    console.log(`HTTP Server running on port ${process.env.PORT}`);
});