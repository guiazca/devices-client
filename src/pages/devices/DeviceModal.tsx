import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, MenuItem } from '@mui/material';
import { Device, Brand, Model } from './types';
import { fetchBrands, fetchModelsByBrand } from './api';
import { fetchLocations } from '../locations/api';
import { Location } from '../locations/types';

interface DeviceModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (device: Device) => void;
  device?: Device;
}

const DeviceModal: React.FC<DeviceModalProps> = ({ open, onClose, onSave, device }) => {
  const [formData, setFormData] = useState<Device>({ 
    modeloId: 0, 
    localizacaoId: 0, 
    marcaId: 0, 
    ip: '', 
    porta: undefined, 
    url: '', 
    nome: '', 
    macAddress: '', 
    descricao: '', 
    marcaNome: '',
    modeloNome: ''
  });
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const brandsData = await fetchBrands();
      const locationsData = await fetchLocations();
      setBrands(brandsData);
      setLocations(locationsData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (device) {
      setFormData(device);
      if (device.marcaId) {
        fetchModelsByBrand(device.marcaId).then((modelsData) => {
          setModels(modelsData);
        });
      }
    } else {
      setFormData({ 
        marcaNome: '',
        modeloNome: '',
        modeloId: 0, 
        localizacaoId: 0, 
        marcaId: 0, 
        ip: '', 
        porta: undefined, 
        url: '', 
        nome: '', 
        macAddress: '', 
        descricao: '' 
      });
    }
  }, [device]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'ip' || name === 'porta') {
      updateUrl({ ...formData, [name]: value });
    }
  };

  const handleBrandChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const brandId = parseInt(e.target.value, 10);
    setFormData({ ...formData, marcaId: brandId, modeloId: 0 });
    const modelsData = await fetchModelsByBrand(brandId);
    setModels(modelsData);
  };

  const updateUrl = (data: Device) => {
    if (data.porta) {
      setFormData({ ...data, url: `https://${data.ip}:${data.porta}` });
    } else {
      setFormData({ ...data, url: `https://${data.ip}` });
    }
  };

  const handleSave = () => {
    updateUrl(formData); // Ensure URL is updated before saving
    onSave(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100%', 
          overflowY: 'auto' 
        }}
      >
        <Box 
          sx={{ 
            width: '50%', 
            bgcolor: 'white', 
            p: 4, 
            borderRadius: 1,
            boxShadow: 24,
            maxHeight: '90vh', // ensure the modal does not exceed the viewport height
            overflowY: 'auto' // allow scrolling if the content exceeds the modal height
          }}
        >
          <TextField
            select
            fullWidth
            label="Marca"
            name="marcaId"
            value={formData.marcaId}
            onChange={handleBrandChange}
            margin="normal"
          >
            {brands.map((brand) => (
              <MenuItem key={brand.id} value={brand.id}>
                {brand.nome}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            label="Modelo"
            name="modeloId"
            value={formData.modeloId}
            onChange={handleChange}
            margin="normal"
            disabled={!formData.marcaId}
          >
            {models.map((model) => (
              <MenuItem key={model.id} value={model.id}>
                {model.nome}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            label="Localização"
            name="localizacaoId"
            value={formData.localizacaoId}
            onChange={handleChange}
            margin="normal"
          >
            {locations.map((location) => (
              <MenuItem key={location.id} value={location.id}>
                {location.nome}
              </MenuItem>
            ))}
          </TextField>
          <TextField fullWidth label="Nome" name="nome" value={formData.nome} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="IP" name="ip" value={formData.ip} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Porta" name="porta" value={formData.porta} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="URL" name="url" value={formData.url} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Mac Address" name="macAddress" value={formData.macAddress} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Descrição" name="descricao" value={formData.descricao} onChange={handleChange} margin="normal" />
          <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginTop: 2 }}>Salvar</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeviceModal;
