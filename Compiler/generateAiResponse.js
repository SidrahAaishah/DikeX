// // /utils/generateAiResponse.js
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API);

// /**
//  * Generates AI feedback for a code submission.
//  * @param {object} params
//  * @param {string} params.code - The user's source code.
//  * @param {string} params.verdict - The submission verdict ('Passed' or 'Failed').
//  */
// const generateAiResponse = async ({ code, verdict }) => {
//   let prompt;

//   if (verdict === 'Passed') {
//     prompt = `You are a senior software engineer reviewing the following code, which has passed all tests.
    
// Code:
// \`\`\`
// ${code}
// \`\`\`

// Provide a concise, helpful review covering:
// 1.  **Code Logic**: Briefly explain the approach.
// 2.  **Optimization**: Suggest one key optimization or an alternative approach, if applicable.
// 3.  **Complexity**: State the time and space complexity (e.g., Time: O(N), Space: O(1)).`;
//   } else {
//     // This logic is now only triggered by the controller after 3+ failures.
//     prompt = `A user is stuck on a coding problem. Their provided code is failing. Your task is to provide a single, subtle hint to guide them without giving away the solution.

// User's Code:
// \`\`\`
// ${code}
// \`\`\`
    
// Instructions for your hint:
// - **Do NOT** provide the correct code or fix their code.
// - **Do NOT** describe the full correct algorithm.
// - **DO** focus on a potential logical flaw, a missed edge case, or a conceptual misunderstanding evident in their code.
// - **DO** frame your hint as a question to encourage critical thinking. For example: "Have you considered what happens if the input list contains duplicate numbers?" or "What might happen if the largest number is at the very beginning of the array?".`;
//   }

//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     return response.text();
//   } catch (error) {
//     console.error("Error generating AI response:", error);
//     return "Could not generate AI feedback at this time.";
//   }
// };

// module.exports = generateAiResponse;

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