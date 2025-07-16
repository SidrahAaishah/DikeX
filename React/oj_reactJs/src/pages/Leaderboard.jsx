import { useState, useEffect } from 'react';

function Leaderboard() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="text-center animate-fade-in">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-4">
          🚀 Leaderboard Page
        </h1>
        <p className="text-2xl sm:text-3xl text-gray-700 font-medium">
          Coming Soon<span className="animate-pulse text-blue-500">{dots}</span>
        </p>
        <p className="mt-4 text-gray-500 text-sm">
          We’re working hard to rank the top coders 🔥
        </p>
      </div>
    </div>
  );
}

export default Leaderboard;
