import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProblemById } from '../Services/problemService';
import MyCompiler from '../Components/MyCompiler';

function Solve() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    fetchProblemById(id)
      .then(res => setProblem(res.data))
      .catch(console.error);
  }, [id]);

  if (!problem) return <div>Loading...</div>;

  return (
    <div className="flex h-[90vh]">
      {/* Left side - problem statement */}
      <div className="w-1/2 p-4 overflow-auto border-r">
        <h2 className="text-2xl font-bold">{problem.name}</h2>
        <p className="mt-4 whitespace-pre-line">{problem.statement}</p>
      </div>

      {/* Right side - compiler */}
      <div className="w-1/2 p-4 overflow-auto">
        <MyCompiler defaultCode={'#include<iostream>\nusing namespace std;\nint main() {\n  return 0;\n}'} />

      </div>
    </div>
  );
}

export default Solve;
