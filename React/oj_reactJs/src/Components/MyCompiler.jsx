// import { useState } from 'react';
// import { codeExec } from '../Services/problemService';

// function MyCompiler({ defaultCode = '', language = 'cpp' }) {
//   const [code, setCode] = useState(defaultCode);
//   const [output, setOutput] = useState('');

//   const handleRun = async () => {
//     try {
//        const res = await codeExec(code, language);
//       setOutput(res.data.output);
//     } catch (err) {
//       setOutput(err.response?.data?.error || 'Error executing code');
//     }
//   };

//   return (
//     <div className="w-full h-full flex flex-col">
//       <textarea
//         value={code}
//         onChange={(e) => setCode(e.target.value)}
//         className="flex-1 p-2 font-mono border"
//         placeholder="Write your code here"
//       />
//       <button onClick={handleRun} className="bg-blue-500 text-white p-2 mt-2 rounded">
//         Run
//       </button>
//       <pre className="bg-black text-green-400 p-2 mt-2 overflow-auto h-40">{output}</pre>
//     </div>
//   );
// }

// export default MyCompiler;

import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import axios from 'axios';

/*
  
   A <select> lets the user choose a language (currently only C++ is wired-up).
   `react-simple-code-editor` gives us a light-weight code editor component.
   When the **Run** button is clicked we POST the source code to the back-end.
   The server responds with the program output which we display underneath.

  NOTE: Everything is kept inside a single functional component for simplicity,
        but feel free to break this up into smaller pieces once the app grows.
*/

function MyCompiler() {
  const [code, setCode] = useState(`
  // Include the input/output stream library
  #include <iostream> 

  // Define the main function
  int main() { 
      // Output "Hello World!" to the console
      std::cout << "Hello World!"; 
      
      // Return 0 to indicate successful execution
      return 0; 
  }`);
  const [output, setOutput] = useState('');

  const handleSubmit = async () => {
    /*
      STEP-BY-STEP of what happens here:
      1. We build the payload expected by the Express server.
      2. We send it with Axios (POST request).
      3. On success we store the returned `output` in local state so React can
         re-render the <output> area.
      4. Errors (compile-time or server issues) are logged for now – you may want
         to surface them in the UI later.
    */
    const payload = {
      language: 'cpp',
      code
    };

    try {
      const { data } = await axios.post(import.meta.env.VITE_BACKEND_URL, payload);
      console.log(data);
      setOutput(data.output);
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <div className="container mx-auto py-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">DikeX Crusher</h1>
      <select className="select-box border border-gray-300 rounded-lg py-1.5 px-4 mb-1 focus:outline-none focus:border-indigo-500">
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
