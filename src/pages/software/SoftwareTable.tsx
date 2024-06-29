import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Software } from './types';

interface SoftwareTableProps {
  softwares: Software[];
  onEdit: (software: Software) => void;
  onDelete: (id: number) => void;
}

const SoftwareTable: React.FC<SoftwareTableProps> = ({ softwares, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Data da Última Atualização</TableCell>
            <TableCell>IP</TableCell>
            <TableCell>Porta</TableCell>
            <TableCell>URL</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {softwares.map((software) => (
            <TableRow key={software.id}>
              <TableCell>{software.id}</TableCell>
              <TableCell>{software.nome}</TableCell>
              <TableCell>{software.DataUltimaAtualizacao}</TableCell>
              <TableCell>{software.ip}</TableCell>
              <TableCell>{software.porta}</TableCell>
              <TableCell>{software.url}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => onEdit(software)}>Editar</Button>
                <Button variant="contained" color="secondary" onClick={() => onDelete(software.id!)}>Deletar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SoftwareTable;
