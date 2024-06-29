import React, { useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';
import { fetchDevices, createDevice, updateDevice, deleteDevice } from './api';
import { Device } from './types';
import DeviceTable from './DeviceTable';
import DeviceModal from './DeviceModal';

const DevicesPage: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState<Device | undefined>(undefined);

  const fetchData = async (page: number, pageSize: number) => {
    try {
      const data = await fetchDevices(page, pageSize);
      setDevices(data);
      setTotalItems(data.length);

    } catch (error) {
      console.error('Error fetching data:', error); // Log de depuração
    }
  };

  useEffect(() => {
    fetchData(page, pageSize);
  }, [page, pageSize]);

  const handleOpenModal = () => {
    setEditingDevice(undefined);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    fetchData(page, pageSize); // Atualiza a lista ao fechar o modal
  };

  const handleSaveDevice = async (device: Device) => {
    try {
      if (device.id) {
        await updateDevice(device);
      } else {
        await createDevice(device);
      }
      fetchData(page, pageSize); // Atualiza a lista após salvar
      handleCloseModal(); // Fecha o modal após salvar
    } catch (error) {
      console.error('Error saving device:', error); // Log de depuração
    }
  };

  const handleEditDevice = (device: Device) => {
    setEditingDevice(device);
    setModalOpen(true);
  };

  const handleDeleteDevice = async (id: number) => {
    try {
      await deleteDevice(id);
      fetchData(page, pageSize); // Atualiza a lista após deletar
    } catch (error) {
      console.error('Error deleting device:', error); // Log de depuração
    }
  };

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(1); // Reset to the first page
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ marginBottom: 2 }}>
        Cadastrar Dispositivo
      </Button>
      <DeviceTable 
        devices={devices} 
        totalItems={totalItems} 
        page={page} 
        pageSize={pageSize} 
        onPageChange={handlePageChange} 
        onRowsPerPageChange={handleRowsPerPageChange} 
        onEdit={handleEditDevice} 
        onDelete={handleDeleteDevice} 
      />
      <DeviceModal open={isModalOpen} onClose={handleCloseModal} onSave={handleSaveDevice} device={editingDevice} />
    </Box>
  );
};

export default DevicesPage;
