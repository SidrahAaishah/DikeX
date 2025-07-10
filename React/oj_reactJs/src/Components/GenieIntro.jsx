import React from 'react';
import { motion } from 'framer-motion';

const GenieIntro = () => {
  return (
    <motion.div
      className="flex justify-center mb-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="bg-white p-6 rounded-xl shadow-md text-center max-w-xl">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
          alt="Genie"
          className="w-24 h-24 mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold mb-2">🧞 Dike Genie is here to help!</h2>
        <p className="text-gray-600">Choose a problem to get explanations, approaches, edge cases, and correct code.</p>
      </div>
    </motion.div>
  );
};

export default GenieIntro;
