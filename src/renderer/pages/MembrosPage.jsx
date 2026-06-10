import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  TextField,
  MenuItem,
  Avatar,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function MembrosPage() {
  const [membros, setMembros] = useState([
    {
      id: 1,
      nome: 'João Silva',
      email: 'joao@email.com',
      telefone: '(11) 99999-0001',
      status: 'ativo',
      dataAdmissao: '2023-01-15',
      contribuicao: 500,
    },
    {
      id: 2,
      nome: 'Maria Santos',
      email: 'maria@email.com',
      telefone: '(11) 99999-0002',
      status: 'ativo',
      dataAdmissao: '2023-03-20',
      contribuicao: 300,
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    status: 'ativo',
    dataAdmissao: new Date().toISOString().split('T')[0],
    contribuicao: '',
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      status: 'ativo',
      dataAdmissao: new Date().toISOString().split('T')[0],
      contribuicao: '',
    });
  };

  const handleSaveMember = () => {
    const newMember = {
      id: membros.length + 1,
      ...formData,
      contribuicao: parseFloat(formData.contribuicao || 0),
    };
    setMembros([...membros, newMember]);
    handleCloseDialog();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Gestão de Membros
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Novo Membro
        </Button>
      </Box>

      {/* Tabela de Membros */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#f5f5f5' }}>
              <TableRow>
                <TableCell><strong>Nome</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Telefone</strong></TableCell>
                <TableCell><strong>Data Admissão</strong></TableCell>
                <TableCell align="right"><strong>Última Contribuição</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell align="center"><strong>Ações</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {membros.map((membro) => (
                <TableRow key={membro.id}>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Avatar sx={{ width: 32, height: 32, bgcolor: '#1976d2' }}>
                        {getInitials(membro.nome)}
                      </Avatar>
                      {membro.nome}
                    </Stack>
                  </TableCell>
                  <TableCell>{membro.email}</TableCell>
                  <TableCell>{membro.telefone}</TableCell>
                  <TableCell>{new Date(membro.dataAdmissao).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                    R$ {membro.contribuicao.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'inline-block',
                        bgcolor: membro.status === 'ativo' ? '#e8f5e9' : '#ffebee',
                        color: membro.status === 'ativo' ? '#2e7d32' : '#c62828',
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.85rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {membro.status === 'ativo' ? 'Ativo' : 'Inativo'}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Button size="small" startIcon={<EditIcon />} />
                    <Button size="small" startIcon={<DeleteIcon />} color="error" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Dialog Novo Membro */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Novo Membro
          </Typography>

          <TextField
            fullWidth
            label="Nome Completo"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleInputChange}
            margin="normal"
            placeholder="(XX) 9XXXX-XXXX"
          />

          <TextField
            fullWidth
            label="Data de Admissão"
            name="dataAdmissao"
            type="date"
            value={formData.dataAdmissao}
            onChange={handleInputChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            label="Contribuição Mensal"
            name="contribuicao"
            type="number"
            value={formData.contribuicao}
            onChange={handleInputChange}
            margin="normal"
            inputProps={{ step: '0.01' }}
          />

          <TextField
            select
            fullWidth
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            margin="normal"
          >
            <MenuItem value="ativo">Ativo</MenuItem>
            <MenuItem value="inativo">Inativo</MenuItem>
          </TextField>

          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button variant="outlined" onClick={handleCloseDialog} fullWidth>
              Cancelar
            </Button>
            <Button variant="contained" onClick={handleSaveMember} fullWidth>
              Salvar
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}

export default MembrosPage;
