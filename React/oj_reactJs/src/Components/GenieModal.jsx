import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const GenieModal = ({ problem, onClose }) => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRequest = async (type) => {
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND1_URL}/genieExplain`, {
        problemStatement: problem.statement,
        type
      });
      setResponse(res.data.response);
    } catch (err) {
      setResponse('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg p-6 w-full max-w-2xl relative shadow-lg"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
        >
          <button className="absolute top-2 right-3 text-gray-600 hover:text-red-600" onClick={onClose}>
            ✖
          </button>

          <h2 className="text-xl font-bold mb-4">🧞 Dike Genie Help for: {problem.name}</h2>

          <div className="flex flex-wrap gap-3 mb-4">
            <button onClick={() => handleRequest('explain')} className="bg-blue-500 text-white px-4 py-2 rounded">
              Explain Problem
            </button>
            <button onClick={() => handleRequest('approach')} className="bg-indigo-500 text-white px-4 py-2 rounded">
              Give Approach
            </button>
            <button onClick={() => handleRequest('edge')} className="bg-yellow-500 text-white px-4 py-2 rounded">
              Edge Cases
            </button>
            <button onClick={() => handleRequest('code')} className="bg-green-500 text-white px-4 py-2 rounded">
              Show Correct Code
            </button>
          </div>

          {loading && <p className="text-sm text-gray-500">Genie is thinking...</p>}

          {response && (
            <div className="mt-4 max-h-60 overflow-y-auto whitespace-pre-wrap text-sm text-gray-800 border p-3 rounded">
              {response}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GenieModal;
