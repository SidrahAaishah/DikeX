import { useState } from 'react';
import axios from 'axios';

function MyCompiler({ defaultCode = '', language = 'cpp' }) {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('');

  const handleRun = async () => {
    try {
      const res = await axios.post('https://localhost:8000/run', { code, language });
      setOutput(res.data.output);
    } catch (err) {
      setOutput(err.response?.data?.error || 'Error executing code');
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="flex-1 p-2 font-mono border"
        placeholder="Write your code here"
      />
      <button onClick={handleRun} className="bg-blue-500 text-white p-2 mt-2 rounded">
        Run
      </button>
      <pre className="bg-black text-green-400 p-2 mt-2 overflow-auto h-40">{output}</pre>
    </div>
  );
}

export default MyCompiler;
