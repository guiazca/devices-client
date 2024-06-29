import axios from 'axios';
import { Device } from './types';

const api = axios.create({
  baseURL: 'https://localhost:7131/api', // Atualize a URL base para o seu backend
});

// Funções para Marcas
export const fetchBrands = async () => {
  const response = await api.get('/Marcas');
  return response.data;
};

// Funções para Modelos
export const fetchModelsByBrand = async (brandId: number) => {
  const response = await api.get(`/Modelos/${brandId}/modelos`);
  return response.data;
};

// Funções para Dispositivos
export const fetchDevices = async (page: number, pageSize: number, marcaId?: number, localizacaoId?: number) => {
  const response = await api.get('/dispositivos', {
    params: { page, pageSize, marcaId, localizacaoId }
  });
  return response.data;
};

export const createDevice = async (device: Device) => {
  const response = await api.post('/Dispositivos', device);
  return response.data;
};

export const updateDevice = async (device: Device) => {
  const response = await api.put(`/Dispositivos/${device.id}`, device);
  return response.data;
};

export const deleteDevice = async (id: number) => {
  const response = await api.delete(`/Dispositivos/${id}`);
  return response.data;
};
