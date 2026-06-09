import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Grid,
  Alert,
  Tabs,
  Tab,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

function ConfiguracaPage() {
  const [tabValue, setTabValue] = useState(0);
  const [saved, setSaved] = useState(false);

  const [config, setConfig] = useState({
    nomeigreia: 'Igreja Madeira',
    endereco: 'Rua Principal, 123',
    telefone: '(11) 3000-0000',
    email: 'contato@igrejamadera.com',
    cnpj: '00.000.000/0001-00',
    pastor: 'Pastor João Silva',
  });

  const [notificacoes, setNotificacoes] = useState({
    emailTransacoes: true,
    emailDespesas: true,
    emailRelatorios: false,
    notificacoesDesktop: true,
  });

  const [backup, setBackup] = useState({
    automatico: true,
    frequencia: 'diaria',
  });

  const handleSaveConfig = () => {
    console.log('Configurações salvas:', config);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleConfigChange = (e) => {
    const { name, value } = e.target;
    setConfig({ ...config, [name]: value });
  };

  const handleNotificacaoChange = (e) => {
    const { name, checked } = e.target;
    setNotificacoes({ ...notificacoes, [name]: checked });
  };

  const handleBackupChange = (e) => {
    const { name, value } = e.target;
    setBackup({ ...backup, [name]: value });
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 'bold' }}>
        Configurações
      </Typography>

      {saved && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Configurações salvas com sucesso!
        </Alert>
      )}

      <Paper>
        <Tabs value={tabValue} onChange={(e, value) => setTabValue(value)}>
          <Tab label="Informações Gerais" />
          <Tab label="Notificações" />
          <Tab label="Backup" />
          <Tab label="Segurança" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {/* Aba: Informações Gerais */}
          {tabValue === 0 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Dados da Igreja
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nome da Igreja"
                    name="nomeigreia"
                    value={config.nomeigreia}
                    onChange={handleConfigChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Endereço"
                    name="endereco"
                    value={config.endereco}
                    onChange={handleConfigChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Telefone"
                    name="telefone"
                    value={config.telefone}
                    onChange={handleConfigChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="CNPJ"
                    name="cnpj"
                    value={config.cnpj}
                    onChange={handleConfigChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={config.email}
                    onChange={handleConfigChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Pastor Principal"
                    name="pastor"
                    value={config.pastor}
                    onChange={handleConfigChange}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSaveConfig}
              >
                Salvar Configurações
              </Button>
            </Box>
          )}

          {/* Aba: Notificações */}
          {tabValue === 1 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Preferências de Notificações
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={notificacoes.emailTransacoes}
                    onChange={handleNotificacaoChange}
                    name="emailTransacoes"
                  />
                }
                label="Notificações de Transações por Email"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={notificacoes.emailDespesas}
                    onChange={handleNotificacaoChange}
                    name="emailDespesas"
                  />
                }
                label="Alertas de Despesas por Email"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={notificacoes.emailRelatorios}
                    onChange={handleNotificacaoChange}
                    name="emailRelatorios"
                  />
                }
                label="Enviar Relatórios Mensais por Email"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={notificacoes.notificacoesDesktop}
                    onChange={handleNotificacaoChange}
                    name="notificacoesDesktop"
                  />
                }
                label="Notificações do Sistema"
              />

              <Divider sx={{ my: 3 }} />

              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSaveConfig}
              >
                Salvar Notificações
              </Button>
            </Box>
          )}

          {/* Aba: Backup */}
          {tabValue === 2 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Configurações de Backup
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={backup.automatico}
                    onChange={(e) => setBackup({ ...backup, automatico: e.target.checked })}
                  />
                }
                label="Ativar Backup Automático"
              />

              <TextField
                select
                fullWidth
                label="Frequência"
                value={backup.frequencia}
                onChange={handleBackupChange}
                name="frequencia"
                sx={{ mt: 2 }}
              >
                <option value="diaria">Diária</option>
                <option value="semanal">Semanal</option>
                <option value="mensal">Mensal</option>
              </TextField>

              <Box sx={{ mt: 3, p: 2, bgcolor: '#e3f2fd', borderRadius: 1 }}>
                <Typography variant="body2" color="primary">
                  📌 <strong>Último Backup:</strong> 15/02/2024 às 23:45
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <Button variant="contained">
                  Fazer Backup Agora
                </Button>
                <Button variant="outlined">
                  Restaurar Backup
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSaveConfig}
              >
                Salvar Backup
              </Button>
            </Box>
          )}

          {/* Aba: Segurança */}
          {tabValue === 3 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Segurança
              </Typography>

              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Alterar senha da sua conta
              </Typography>

              <TextField
                fullWidth
                label="Senha Atual"
                type="password"
                margin="normal"
              />

              <TextField
                fullWidth
                label="Nova Senha"
                type="password"
                margin="normal"
              />

              <TextField
                fullWidth
                label="Confirmar Nova Senha"
                type="password"
                margin="normal"
              />

              <Box sx={{ mt: 3 }}>
                <Button variant="contained">
                  Alterar Senha
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Gerenciar Usuários
              </Typography>

              <Button variant="outlined">
                Adicionar Novo Usuário
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default ConfiguracaPage;
