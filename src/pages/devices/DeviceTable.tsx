import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Device } from './types';

interface DeviceTableProps {
  devices: Device[];
  onEdit: (device: Device) => void;
  onDelete: (id: number) => void;
}

const DeviceTable: React.FC<DeviceTableProps> = ({ devices, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Modelo</TableCell>
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
              <TableCell>{device.id}</TableCell>
              <TableCell>{device.modeloId}</TableCell>
              <TableCell>{device.localizacaoId}</TableCell>
              <TableCell>{device.ip}</TableCell>
              <TableCell>{device.porta}</TableCell>
              <TableCell>{device.url}</TableCell>
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
