// utils/genieExplanation.js
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const getGenieExplanation = async ({ problemStatement, type }) => {
  let prompt = `You are a helpful AI coding assistant.\n\nHere is the problem statement:\n${problemStatement}\n\n`;

  switch (type) {
    case 'simplify':
      prompt += "Explain this problem in very simple terms.";
      break;
    case 'approach':
      prompt += "Suggest an optimal approach to solve this problem.";
      break;
    case 'edge-cases':
      prompt += "List tricky edge cases that must be handled.";
      break;
    case 'code':
      prompt += "Write correct, clean code with a brief explanation.";
      break;
    default:
      prompt += "Explain this problem helpfully.";
  }

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

module.exports = getGenieExplanation;
