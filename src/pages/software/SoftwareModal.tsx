import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { Software } from './types';

interface SoftwareModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (software: Software) => void;
  software?: Software;
}

const SoftwareModal: React.FC<SoftwareModalProps> = ({ open, onClose, onSave, software }) => {
  const [formData, setFormData] = useState<Software>({ nome: '', dataUltimaAtualizacao: '', ip: '', porta: undefined, url: '' });

  useEffect(() => {
    if (software) {
      setFormData(software);
    } else {
      setFormData({ nome: '', dataUltimaAtualizacao: '', ip: '', porta: undefined, url: '' });
    }
  }, [software]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (!formData.url) {
      if (formData.porta) {
        formData.url = `https://${formData.ip}:${formData.porta}`;
      } else {
        formData.url = `https://${formData.ip}`;
      }
    }
    onSave(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ padding: 4, backgroundColor: 'white', margin: 'auto', marginTop: '10%', width: '50%' }}>
        <TextField fullWidth label="Nome" name="nome" value={formData.nome} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Data da Última Atualização" name="dataUltimaAtualizacao" value={formData.dataUltimaAtualizacao} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="IP" name="ip" value={formData.ip} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Porta" name="porta" value={formData.porta} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="URL" name="url" value={formData.url} onChange={handleChange} margin="normal" />
        <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginTop: 2 }}>Salvar</Button>
      </Box>
    </Modal>
  );
};

export default SoftwareModal;
