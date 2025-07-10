import React from 'react';

const ProblemCard = ({ problem, onSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200">
      <h3 className="text-lg font-bold mb-1">{problem.name}</h3>
      <span className={`inline-block px-2 py-1 text-xs rounded ${
        problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800'
        : problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800'
        : 'bg-red-100 text-red-800'
      }`}>
        {problem.difficulty}
      </span>
      <div className="mt-2 text-sm text-gray-500">Tags: {problem.tags.join(', ')}</div>
      <button
        onClick={onSelect}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 text-sm rounded"
      >
        Select
      </button>
    </div>
  );
};

export default ProblemCard;
