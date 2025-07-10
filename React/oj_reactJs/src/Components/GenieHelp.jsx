import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GenieHelp = ({ feedback }) => {
  const [showGenie, setShowGenie] = useState(false);
  const [showHelpBox, setShowHelpBox] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowGenie(true);
    }, 1200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {/* Big Genie Entrance */}
      <AnimatePresence>
        {showGenie && !showHelpBox && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
          >
            <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-xl text-center">
              {/* ✖ Close Button */}
              <button
                className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl"
                onClick={() => setShowGenie(false)}
              >
                ✖
              </button>

              <img
                src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
                alt="Genie"
                className="w-24 h-24 mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">Dike Genie Appears!</h2>
              <p className="text-sm text-gray-600 mb-4">
                Do you want help understanding or improving your code?
              </p>
              <button
                onClick={() => setShowHelpBox(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Yes, show help
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelpBox && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-11/12 max-w-2xl p-6 rounded-lg shadow-lg relative"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <button
                className="absolute top-2 right-3 text-gray-500 hover:text-red-600"
                onClick={() => setShowHelpBox(false)}
              >
                ✖
              </button>
              <h2 className="text-xl font-bold mb-3">🧞 Dike Genie Help</h2>
              <div className="max-h-[400px] overflow-y-auto whitespace-pre-wrap font-mono text-sm text-gray-800">
                {feedback}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GenieHelp;
