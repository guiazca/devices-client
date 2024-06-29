import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Device } from './types';

interface DeviceTableProps {
  devices: Device[];
  onEdit: (device: Device) => void;
  onDelete: (id: number) => void;
}

const DeviceTable: React.FC<DeviceTableProps> = ({ devices, onEdit, onDelete }) => {
  const formatUrl = (url: string) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `http://${url}`;
    }
    return url;
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Modelo</TableCell>
            <TableCell>Marca</TableCell>
            <TableCell>Localização</TableCell>
            <TableCell>IP</TableCell>
            <TableCell>Porta</TableCell>
            <TableCell>URL</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.id}>
              <TableCell>{device.marcaNome}</TableCell>
              <TableCell>{device.modeloNome}</TableCell>
              <TableCell>{device.localizacaoNome}</TableCell>
              <TableCell>{device.ip}</TableCell>
              <TableCell>{device.porta}</TableCell>
              <TableCell>
                <a href={formatUrl(device?.url!)} target="_blank" rel="noopener noreferrer">
                  {device.url}
                </a>
              </TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => onEdit(device)}>Editar</Button>
                <Button variant="contained" color="secondary" onClick={() => onDelete(device.id!)}>Deletar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DeviceTable;
