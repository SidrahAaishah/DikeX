// problemservice.jsx
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND1_URL}`;

const instance = axios.create({
  baseURL: `${API_URL}/api`,
});


export const fetchProblems = () => instance.get('/problems');
export const fetchProblemById = (id) => instance.get(`/problems/${id}`);

export const codeExec = async (code, input,language) => {
  const payload = { code,input,language };
  return await instance.post('/run', payload);
};
