require('dotenv').config(); 
// const https  = require('https');
const http = require('http'); // Use http for simplicity in this example
const fs = require('fs');
const { urlencoded } = require("body-parser");
const express  = require("express");
const app = express();
const cors = require('cors');

const generateFile = require("./generateFile");
const executeCpp = require("./executeCpp");
const executePython  = require("./executePython");
const executeJava = require("./executeJava");
const generateInputFile = require('./generateInputFile');
const generateAiResponse = require('./generateAiResponse');
const genieExplanation = require('./genieExplanation');
app.use(cors({
   origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("hello world");
})

app.post("/run", async (req, res) => {
    const { code,input,language} = req.body;

    if (code===undefined || code.trim()==='') {
        return res.status(400).json({ success: false, error: "empty code body" });
    }

    try {
        const filePath = generateFile(code,language);
        const inputFilePath = generateInputFile(input)
        let output;
        if (language === "cpp") {
            output = await executeCpp(filePath,inputFilePath);
        }else if(language==="py"){
            output = await executePython(filePath);
        }else{
            output = await executeJava(filePath);
        }


        res.json({output});
    } catch (error) {
        console.error("Execution error:", error);  
        res.status(500).json({ success: false, error: error.message || error.stderr || "Unknown error" });
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

app.post("/ai-review",async(req,res)=>{
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

// const options = {
//     key: fs.readFileSync('./cert/server.key'),
//     cert: fs.readFileSync('./cert/server.cert')
// };

http.createServer(app).listen(process.env.PORT, () => {
    console.log(`HTTP Server running on port ${process.env.PORT}`);
});
