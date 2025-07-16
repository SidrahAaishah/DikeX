import React, { useEffect, useState } from 'react';
const platformMap = {
  'codeforces.com': 'Codeforces',
  'leetcode.com': 'LeetCode',
  'atcoder.jp': 'AtCoder',
  'codechef.com': 'CodeChef',
  'csacademy.com': 'CS Academy',
  'kickstart.google.com': 'Kick Start',
  'topcoder.com': 'TopCoder',
  'toph.co': 'Toph',
  'hackerrank.com': 'HackerRank',
  'hackerearth.com': 'HackerEarth',
};

const Contests = () => {
  const [contests, setContests] = useState([]);
  const [filteredContests, setFilteredContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [platform, setPlatform] = useState('All');

  useEffect(() => {
    const now = new Date();
    const formattedNow = now.toISOString().slice(0, 19); // e.g., 2025-07-15T10:00:00

    fetch(
      `https://clist.by/api/v4/contest/?limit=20&start__gt=${formattedNow}&order_by=start&username=Aaishah_Sidrah&api_key=7ab9795caa998c9ca00105e6c5c74d74d72a2536`
    )
      .then((res) => res.json())
      .then((data) => {
        setContests(data.objects || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch contests:', err);
        setLoading(false);
      });
  }, []);

  // Filter contests when platform or contests change
  useEffect(() => {
    if (platform === 'All') {
      setFilteredContests(contests);
    } else {
      setFilteredContests(contests.filter(c => c.resource.name === platform));
    }
  }, [platform, contests]);

  const formatDate = (str) => new Date(str).toLocaleString();

  const getCalendarLink = (contest) => {
    const start = new Date(contest.start);
    const end = new Date(contest.end);
    const startUTC = start.toISOString().replace(/[-:]/g, '').split('.')[0];
    const endUTC = end.toISOString().replace(/[-:]/g, '').split('.')[0];
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(contest.event)}&dates=${startUTC}/${endUTC}&details=Contest%20on%20${contest.resource.name}&location=${contest.href}`;
  };

  const uniquePlatforms = contests.length
    ? [...new Set(contests.map(c => c.resource.name))]
    : [];

  return (
    <div className="p-4 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-center">Upcoming Contests</h1>

      {/* Filter Dropdown */}
      <div className="flex justify-center mb-6">
        <label className="mr-2 font-medium">Filter by Platform:</label>
        <select
  value={platform}
  onChange={(e) => setPlatform(e.target.value)}
  className="border rounded px-3 py-1"
>
  <option value="All">All</option>
  {uniquePlatforms.map((site) => (
    <option key={site} value={site}>
      {platformMap[site] || site}
    </option>
  ))}
</select>

      </div>

      {/* Contest Cards */}
      {loading ? (
        <p className="text-center text-gray-600">Loading contests...</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredContests.map((contest, idx) => (
           <div
  key={idx}
  className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 hover:shadow-lg transition duration-300"
>
  <h2 className="text-lg font-semibold text-gray-800 mb-1">{contest.event}</h2>
  <p className="text-sm text-indigo-500 font-medium mb-2">
    {platformMap[contest.resource.name] || contest.resource.name}
  </p>
  <p className="text-sm text-gray-600">📅 Start: {formatDate(contest.start)}</p>
  <p className="text-sm text-gray-600">⏱ Duration: {(contest.duration / 3600).toFixed(1)} hrs</p>

  <div className="mt-4 flex gap-4">
    <a
      href={contest.href}
      target="_blank"
      rel="noreferrer"
      className="text-sm text-blue-600 hover:text-blue-800 underline"
    >
      🔗 Visit
    </a>
    <a
      href={getCalendarLink(contest)}
      target="_blank"
      rel="noreferrer"
      className="text-sm text-green-600 hover:text-green-800 underline"
    >
      📅 Add to Calendar
    </a>
  </div>
</div>

          ))}
        </div>
      )}
    </div>
  );
};

export default Contests;
