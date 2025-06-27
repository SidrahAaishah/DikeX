import axios from 'axios';

const API_URL = 'https://localhost:5000';

const instance = axios.create({
  baseURL: `${API_URL}/api` ,
});

export const fetchProblems = () => instance.get('/problems');