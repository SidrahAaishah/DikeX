/*
  
   A <select> lets the user choose a language (currently only C++ is wired-up).
   `react-simple-code-editor` gives us a light-weight code editor component.
   When the **Run** button is clicked we POST the source code to the back-end.
   The server responds with the program output which we display underneath.

  NOTE: Everything is kept inside a single functional component for simplicity,
        but feel free to break this up into smaller pieces once the app grows.
*/
import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { codeExec } from '../Services/problemService';

function MyCompiler() {
  const [code, setCode] = useState(`
// Include the input/output stream library
#include <iostream> 

// Define the main function
int main() { 
    // Output "Hello World!" to the console
    std::cout << "Hello World!"; 
    return 0; 
}`);
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('cpp');

  const handleSubmit = async () => {
    try {
      const { data } = await codeExec(code, language);
      setOutput(data.output);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="container mx-auto py-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">DikeX Crusher</h1>

      {/* Language dropdown */}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="select-box border border-gray-300 rounded-lg py-1.5 px-4 mb-1 focus:outline-none focus:border-indigo-500"
      >
        <option value='cpp'>C++</option>
        <option value='c'>C</option>
        <option value='py'>Python</option>
        <option value='java'>Java</option>
      </select>

      <br />

      <div className="bg-gray-100 shadow-md w-full max-w-lg mb-4" style={{ height: '300px', overflowY: 'auto' }}>
        <Editor
          value={code}
          onValueChange={code => setCode(code)}
          highlight={code => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            outline: 'none',
            border: 'none',
            backgroundColor: '#f7fafc',
            height: '100%',
            overflowY: 'auto'
          }}
        />
      </div>

      <button
        onClick={handleSubmit}
        type="button"
        className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
      >
        Run
      </button>

      {output &&
        <div className="outputbox mt-4 bg-gray-100 rounded-md shadow-md p-4">
          <p style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}>{output}</p>
        </div>
      }
    </div>
  );
}

export default MyCompiler;