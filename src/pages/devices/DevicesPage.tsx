import React, { useState, useEffect } from 'react';
import { Button, Box, TextField, MenuItem } from '@mui/material';
import DeviceTable from './DeviceTable';
import DeviceModal from './DeviceModal';
import { fetchDevices, createDevice, updateDevice, deleteDevice } from './api';
import { fetchLocations } from '../locations/api';
import { Device, Brand, Location } from './types';
import { Category } from '../categories/types';
import { fetchBrands } from '../brand/api';
import { fetchCategories } from '../categories/api';

const DevicesPage: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState<Device | undefined>(undefined);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<number | undefined>(undefined);
  const [selectedLocation, setSelectedLocation] = useState<number | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);

  const fetchData = async (page: number, pageSize: number, marcaId?: number, localizacaoId?: number, categoriaId?: number) => {
    try {
      console.log('Fetching data...', { page, pageSize, marcaId, localizacaoId, categoriaId }); // Log de depuração
      const data = await fetchDevices(page, pageSize, marcaId, localizacaoId, categoriaId);
      console.log('Data fetched:', data); // Log de depuração
      setDevices(data.items);
      setTotalItems(data.totalItems);
      console.log('Devices state updated:', data.items); // Log de depuração
    } catch (error) {
      console.error('Error fetching data:', error); // Log de depuração
    }
  };

  useEffect(() => {
    fetchData(page, pageSize, selectedBrand, selectedLocation, selectedCategory);
  }, [page, pageSize, selectedBrand, selectedLocation, selectedCategory]);

  useEffect(() => {
    const fetchFilterData = async () => {
      const brandsData = await fetchBrands();
      const locationsData = await fetchLocations();
      const categoriesData = await fetchCategories();
      setBrands(brandsData);
      setLocations(locationsData);
      setCategories(categoriesData);
    };

    fetchFilterData();
  }, []);

  const handleOpenModal = () => {
    setEditingDevice(undefined);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    fetchData(page, pageSize, selectedBrand, selectedLocation, selectedCategory); // Atualiza a lista ao fechar o modal
  };

  const handleSaveDevice = async (device: Device) => {
    try {
      if (device.id) {
        await updateDevice(device);
      } else {
        await createDevice(device);
      }
      fetchData(page, pageSize, selectedBrand, selectedLocation, selectedCategory); // Atualiza a lista após salvar
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
      fetchData(page, pageSize, selectedBrand, selectedLocation, selectedCategory); // Atualiza a lista após deletar
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

  const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedBrand(event.target.value === '' ? undefined : parseInt(event.target.value, 10));
    setPage(1); // Reset to the first page
    console.log('Brand changed:', event.target.value); // Log de depuração
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLocation(event.target.value === '' ? undefined : parseInt(event.target.value, 10));
    setPage(1); // Reset to the first page
    console.log('Location changed:', event.target.value); // Log de depuração
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(event.target.value === '' ? undefined : parseInt(event.target.value, 10));
    setPage(1); // Reset to the first page
    console.log('Category changed:', event.target.value); // Log de depuração
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <TextField
          select
          label="Marca"
          value={selectedBrand || ''}
          onChange={handleBrandChange}
          sx={{ marginRight: 2, minWidth: 120 }}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {brands.map((brand) => (
            <MenuItem key={brand.id} value={brand.id}>
              {brand.nome}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Localização"
          value={selectedLocation || ''}
          onChange={handleLocationChange}
          sx={{ marginRight: 2, minWidth: 120 }}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {locations.map((location) => (
            <MenuItem key={location.id} value={location.id}>
              {location.nome}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Categoria"
          value={selectedCategory || ''}
          onChange={handleCategoryChange}
          sx={{ marginRight: 2, minWidth: 120 }}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.nome}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Cadastrar Dispositivo
        </Button>
      </Box>
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
