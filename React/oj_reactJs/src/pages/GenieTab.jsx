// GenieTab.jsx
import React, { useEffect, useState } from 'react';
import { fetchProblems } from '../Services/problemService';
import GenieIntro from '../Components/GenieIntro';
import ProblemCard from '../Components/ProblemCard';
import GenieModal from '../Components/GenieModal';

const GenieTab = () => {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);

  useEffect(() => {
    const loadProblems = async () => {
      try {
        const res = await fetchProblems();
        setProblems(res.data);
      } catch (err) {
        console.error('Failed to fetch problems:', err);
      }
    };

    loadProblems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <GenieIntro />

      <h2 className="text-2xl font-bold text-center mb-6">
        Select a Problem You Need Help With
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {problems.map((problem) => (
          <ProblemCard
            key={problem._id}
            problem={problem}
            onSelect={() => setSelectedProblem(problem)}
          />
        ))}
      </div>

      {selectedProblem && (
        <GenieModal
          problem={selectedProblem}
          onClose={() => setSelectedProblem(null)}
        />
      )}
    </div>
  );
};

export default GenieTab;
