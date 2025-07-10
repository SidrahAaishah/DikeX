const axios = require('axios');
const https = require('https');
const Problem = require('../models/problemModel');
const Submission = require('../models/submissionModel');

const judgeCode = async (req, res) => {
  const { code, language, problemId } = req.body;

  try {
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    const testCases = problem.testCases;
    const results = [];

    // Allow self-signed certificate
    const agent = new https.Agent({ rejectUnauthorized: false });

    for (let test of testCases) {
      try {
        const { data } = await axios.post(
          `${process.env.JUDGE_BACKEND_URL}/run`,
          {
            code,
            language,
            input: test.input
          },
          {
            httpsAgent: agent
          }
        );

        const actual = data.output.trim();
        const expected = test.expectedOutput.trim();

        results.push({
          input: test.input,
          expected,
          actual,
          status: actual === expected ? 'Passed' : 'Failed'
        });
      } catch (err) {
        console.error("Error occurred while hitting /run:", err.message);
        if (err.response) {
          console.error("Error response:", err.response.data);
        }

        results.push({
          input: test.input,
          expected: test.expectedOutput,
          actual: err.response?.data?.error || 'Execution error',
          status: 'Error'
        }); 
      }
    }

    const allPassed = results.every(r => r.status === 'Passed');
    const verdict = allPassed ? 'Accepted' : 'Failed';

    // ✅ 💬 Ask compiler backend for AI feedback
    let aiFeedback = '';
    try {
      const aiRes = await axios.post(
        `${process.env.JUDGE_BACKEND_URL}/ai-review`,
        { code, verdict, testResults: results },
        { httpsAgent: agent }
      );
      aiFeedback = aiRes.data.response;
    } catch (aiErr) {
      console.error("Error fetching AI feedback:", aiErr.message);
      aiFeedback = 'AI feedback unavailable due to internal error.';
    }

    await Submission.create({
    userId: req.user._id, // make sure req.user is set correctly from auth middleware
    problemId,
    code,
    language,
    verdict,
    testResults: results,
    aiFeedback
  });

    res.json({
      verdict: allPassed ? 'Accepted' : 'Failed',
      results,
      aiFeedback
    });

  } catch (err) {
    res.status(500).json({
      error: 'Problem evaluation failed',
      details: err.message
    });
  }

};

module.exports = { judgeCode };
