import axios from 'axios';
import { Software } from './types';

const api = axios.create({
  baseURL: 'https://localhost:7131/api', // Atualize a URL base para o seu backend
});

// Funções para Softwares
export const fetchSoftwares = async () => {
  const response = await api.get('/softwares');
  return response.data;
};

export const createSoftware = async (software: Software) => {
  const response = await api.post('/softwares', software);
  return response.data;
};

export const updateSoftware = async (software: Software) => {
  const response = await api.put(`/softwares/${software.id}`, software);
  return response.data;
};

export const deleteSoftware = async (id: number) => {
  const response = await api.delete(`/softwares/${id}`);
  return response.data;
};
