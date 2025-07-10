// /utils/generateAiResponse.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API);

const generateAiResponse = async ({ code, verdict, testResults }) => {
  let prompt = `You are a code assistant. Here is the user's code:\n\n${code}\n\n`;

  if (verdict === 'Accepted') {
    prompt += `The code passed all test cases. Please:
1. Briefly explain what the code does.
2. Suggest any code optimizations.
3. Mention any unused or unnecessary parts.
4. Estimate the time and space complexity.\n`;
  } else {
    prompt += `The code failed on the following test cases:\n`;
    for (let test of testResults) {
      if (test.status !== 'Passed') {
        prompt += `
Input:
${test.input}
Expected Output:
${test.expected}
User Output:
${test.actual}\n`;
      }
    }
    prompt += `\nHelp the user understand the issue, provide suggestions, and if possible, suggest how to fix it.`;
  }

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return text;
};

module.exports = generateAiResponse;
