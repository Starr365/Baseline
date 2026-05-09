import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const processScan = async (data: any) => {
  const response = await api.post('/scan/process', data);
  return response.data;
};

export default api;
