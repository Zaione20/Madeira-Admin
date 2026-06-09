import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import PrintIcon from '@mui/icons-material/Print';

function RelatoriosPage() {
  const [relatorioType, setRelatorioType] = useState('financeiro');
  const [datainicio, setDatainicio] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]);
  const [dataFim, setDataFim] = useState(new Date().toISOString().split('T')[0]);

  const relatorios = [
    {
      id: 1,
      tipo: 'Financeiro',
      periodo: 'Janeiro 2024',
      receitas: 15000,
      despesas: 5000,
      saldo: 10000,
      data: '2024-01-31',
    },
    {
      id: 2,
      tipo: 'Financeiro',
      periodo: 'Fevereiro 2024',
      receitas: 16000,
      despesas: 5500,
      saldo: 10500,
      data: '2024-02-29',
    },
  ];

  const handleExportPDF = () => {
    console.log('Exportando para PDF...');
    // TODO: Implementar exportação para PDF
  };

  const handleExportExcel = () => {
    console.log('Exportando para Excel...');
    // TODO: Implementar exportação para Excel
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 'bold' }}>
        Relatórios
      </Typography>

      {/* Filtros */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              fullWidth
              label="Tipo de Relatório"
              value={relatorioType}
              onChange={(e) => setRelatorioType(e.target.value)}
            >
              <MenuItem value="financeiro">Relatório Financeiro</MenuItem>
              <MenuItem value="membros">Relatório de Membros</MenuItem>
              <MenuItem value="contribuicoes">Relatório de Contribuições</MenuItem>
              <MenuItem value="despesas">Relatório de Despesas</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Data Início"
              type="date"
              value={datainicio}
              onChange={(e) => setDatainicio(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Data Fim"
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Button variant="contained" fullWidth>
              Filtrar
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Botões de Ação */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button
          variant="outlined"
          startIcon={<GetAppIcon />}
          onClick={handleExportPDF}
        >
          Exportar PDF
        </Button>
        <Button
          variant="outlined"
          startIcon={<GetAppIcon />}
          onClick={handleExportExcel}
        >
          Exportar Excel
        </Button>
        <Button
          variant="outlined"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
        >
          Imprimir
        </Button>
      </Box>

      {/* Tabela de Relatórios */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#f5f5f5' }}>
              <TableRow>
                <TableCell><strong>Tipo</strong></TableCell>
                <TableCell><strong>Período</strong></TableCell>
                <TableCell align="right"><strong>Receitas</strong></TableCell>
                <TableCell align="right"><strong>Despesas</strong></TableCell>
                <TableCell align="right"><strong>Saldo</strong></TableCell>
                <TableCell><strong>Data Geração</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {relatorios.map((relatorio) => (
                <TableRow key={relatorio.id}>
                  <TableCell>{relatorio.tipo}</TableCell>
                  <TableCell>{relatorio.periodo}</TableCell>
                  <TableCell align="right" sx={{ color: '#4caf50', fontWeight: 'bold' }}>
                    R$ {relatorio.receitas.toLocaleString('pt-BR')}
                  </TableCell>
                  <TableCell align="right" sx={{ color: '#f44336', fontWeight: 'bold' }}>
                    R$ {relatorio.despesas.toLocaleString('pt-BR')}
                  </TableCell>
                  <TableCell align="right" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                    R$ {relatorio.saldo.toLocaleString('pt-BR')}
                  </TableCell>
                  <TableCell>{new Date(relatorio.data).toLocaleDateString('pt-BR')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Resumo */}
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, bgcolor: '#e8f5e9' }}>
            <Typography variant="body2" color="textSecondary">
              Total Receitas
            </Typography>
            <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
              R$ 31.000,00
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, bgcolor: '#ffebee' }}>
            <Typography variant="body2" color="textSecondary">
              Total Despesas
            </Typography>
            <Typography variant="h6" sx={{ color: '#c62828', fontWeight: 'bold' }}>
              R$ 10.500,00
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, bgcolor: '#e3f2fd' }}>
            <Typography variant="body2" color="textSecondary">
              Saldo Total
            </Typography>
            <Typography variant="h6" sx={{ color: '#1565c0', fontWeight: 'bold' }}>
              R$ 20.500,00
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RelatoriosPage;
