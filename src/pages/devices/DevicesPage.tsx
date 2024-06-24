import React, { useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';
import DeviceTable from './DeviceTable';
import DeviceModal from './DeviceModal';
import { fetchDevices, createDevice, updateDevice, deleteDevice } from './api';
import { Device } from './types';

const DevicesPage: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState<Device | undefined>(undefined);

  const fetchData = async () => {
    const data = await fetchDevices();
    setDevices(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = () => {
    setEditingDevice(undefined);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    fetchData(); // Atualiza a lista ao fechar o modal
  };

  const handleSaveDevice = async (device: Device) => {
    if (device.id) {
      await updateDevice(device);
    } else {
      await createDevice(device);
    }
    fetchData(); // Atualiza a lista após salvar
    handleCloseModal(); // Fecha o modal após salvar
  };

  const handleEditDevice = (device: Device) => {
    setEditingDevice(device);
    setModalOpen(true);
  };

  const handleDeleteDevice = async (id: number) => {
    await deleteDevice(id);
    fetchData(); // Atualiza a lista após deletar
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ marginBottom: 2 }}>
        Cadastrar Dispositivo
      </Button>
      <DeviceTable devices={devices} onEdit={handleEditDevice} onDelete={handleDeleteDevice} />
      <DeviceModal open={isModalOpen} onClose={handleCloseModal} onSave={handleSaveDevice} device={editingDevice} />
    </Box>
  );
};

export default DevicesPage;
