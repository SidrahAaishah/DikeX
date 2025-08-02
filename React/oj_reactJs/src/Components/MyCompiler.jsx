import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Editor from '@monaco-editor/react';
import { codeExec } from '../Services/problemService';
import GenieHelp from '../Components/GenieHelp';

const languageTemplates = {
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    // your code goes here\n    return 0;\n}`,
  py: `# your code goes here`,
  java: `public class Main {\n    public static void main(String[] args) {\n        // your code goes here\n        System.out.println("Hello, World!");\n    }\n}`,
};

function MyCompiler() {
  const [language, setLanguage] = useState('java');
  const [code, setCode] = useState(languageTemplates['java']);
  const [output, setOutput] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [verdictResult, setVerdictResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openTestIndex, setOpenTestIndex] = useState(null);
  const [showGenie, setShowGenie] = useState(false);

  const problemId = useSelector((state) => state.problem.problemId);
  const token = localStorage.getItem('token');

  const languageMap = { cpp: 'cpp', py: 'python', java: 'java' };

  const handleRun = async () => {
    setOutput('Running...');
    try {
      const { data } = await codeExec(code, customInput, language);
      setOutput(data.output);
    } catch (error) {
      setOutput(error.response?.data?.error || 'Execution error');
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setVerdictResult(null);
    setOpenTestIndex(null);
    setShowGenie(false); // reset Genie state on new submission
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND1_URL}/api/judge`,
        { code, language, problemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setVerdictResult(data);
    } catch (err) {
      setVerdictResult({
        verdict: 'Error',
        message: err.response?.data?.error || err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#2d2d2d] rounded-lg shadow-2xl flex flex-col p-4 h-full">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold text-white">DikeX Crusher</h1>
        <select
          value={language}
          onChange={(e) => {
            const l = e.target.value;
            setLanguage(l);
            setCode(languageTemplates[l]);
          }}
          className="bg-[#1e1e1e] text-white border border-gray-600 rounded-md py-1.5 px-3 focus:outline-none focus:border-blue-500"
        >
          <option value="cpp">C++</option>
          <option value="py">Python</option>
          <option value="java">Java</option>
        </select>
      </div>

      <div className="w-full h-[450px] md:h-[300px] border border-gray-700 rounded-md overflow-hidden shrink-0">
        <Editor
          height="100%"
          language={languageMap[language]}
          value={code}
          onChange={(v) => setCode(v || '')}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            padding: { top: 10 },
          }}
        />
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleRun}
          type="button"
          className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Run
        </button>
        <button
          onClick={handleSubmit}
          type="button"
          disabled={loading}
          className="ml-4 text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row w-full mt-4 gap-4">
        <textarea
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="Custom input for 'Run'..."
          className="w-full md:w-1/2 h-24 p-3 border border-gray-600 rounded bg-[#1e1e1e] text-white font-mono text-sm resize-none focus:outline-none focus:border-blue-500"
        />
        <div className="w-full md:w-1/2 h-24 p-3 bg-[#1e1e1e] border border-gray-700 rounded shadow overflow-auto">
          <p className="font-mono text-sm whitespace-pre-wrap break-words text-gray-300">
            {output || 'Output will appear here.'}
          </p>
        </div>
      </div>

      {verdictResult && (
        <div className="verdictbox mt-4 bg-[#1e1e1e] rounded-md shadow-md p-4 w-full border border-gray-700">
          <h3 className="font-bold mb-2 text-white text-lg">
            Submission Result: {verdictResult.verdict}
          </h3>

          {/* Conditional AI Feedback display */}
          {verdictResult.verdict === 'Accepted' ? (
            verdictResult.aiFeedback && (
              <GenieHelp feedback={verdictResult.aiFeedback} />
            )
          ) : (
            <>
              {!showGenie && verdictResult.aiFeedback && (
                <button
                  onClick={() => setShowGenie(true)}
                  className="text-sm text-white bg-purple-600 hover:bg-purple-700 px-4 py-1.5 rounded"
                >
                  Ask Genie for Help
                </button>
              )}
              {showGenie && verdictResult.aiFeedback && (
                <GenieHelp feedback={verdictResult.aiFeedback} />
              )}
            </>
          )}

          {verdictResult.results && (
            <ul className="text-sm font-mono text-gray-300 space-y-2 mt-4">
              {verdictResult.results.map((t, index) => (
                <li key={index} className="bg-[#2d2d2d] rounded-lg">
                  <div
                    className="flex justify-between items-center p-3 cursor-pointer"
                    onClick={() => {
                      if (t.status !== 'Passed') {
                        setOpenTestIndex(
                          openTestIndex === index ? null : index
                        );
                      }
                    }}
                  >
                    <span>
                      <strong>Test Case {index + 1}:</strong>
                      <span
                        className={`ml-2 font-bold ${
                          t.status === 'Passed'
                            ? 'text-green-400'
                            : 'text-red-400'
                        }`}
                      >
                        {t.status}
                      </span>
                    </span>
                    {t.status !== 'Passed' && (
                      <span className="text-gray-400 text-xs">
                        {openTestIndex === index ? '▲' : '▼'}
                      </span>
                    )}
                  </div>
                  {t.status !== 'Passed' && openTestIndex === index && (
                    <div className="px-3 pb-3 mt-2 border-t border-gray-600 space-y-2">
                      <div className="pt-2">
                        <strong className="text-gray-400">Input:</strong>
                        <pre className="mt-1 p-2 bg-gray-800 rounded whitespace-pre-wrap">
                          {t.input}
                        </pre>
                      </div>
                      <div>
                        <strong className="text-gray-400">
                          Expected Output:
                        </strong>
                        <pre className="mt-1 p-2 bg-gray-800 rounded whitespace-pre-wrap">
                          {t.expected}
                        </pre>
                      </div>
                      <div>
                        <strong className="text-gray-400">Your Output:</strong>
                        <pre className="mt-1 p-2 bg-gray-800 rounded whitespace-pre-wrap">
                          {t.actual}
                        </pre>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default MyCompiler;
