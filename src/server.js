const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Database simulado (será substituído por Sequelize/PostgreSQL)
let users = [
  {
    id: 1,
    email: 'admin@igreja.com',
    password: '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36DRjm1u', // senha: 123456
    name: 'Administrador',
    role: 'admin',
  },
];

let transacoes = [
  {
    id: 1,
    data: '2024-01-15',
    tipo: 'receita',
    categoria: 'Dízimos',
    descricao: 'Dízimos - João Silva',
    valor: 500,
    membro: 'João Silva',
    usuarioId: 1,
  },
];

let membros = [
  {
    id: 1,
    nome: 'João Silva',
    email: 'joao@email.com',
    telefone: '(11) 99999-0001',
    status: 'ativo',
    dataAdmissao: '2023-01-15',
    contribuicao: 500,
    usuarioId: 1,
  },
];

// Middleware de autenticação
const autenticar = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sua_chave_secreta_jwt_aqui');
    req.usuario = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

// ==================== AUTENTICAÇÃO ====================

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    const usuario = users.find(u => u.email === email);

    if (!usuario) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    const senhaValida = await bcrypt.compare(password, usuario.password);

    if (!senhaValida) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, role: usuario.role },
      process.env.JWT_SECRET || 'sua_chave_secreta_jwt_aqui',
      { expiresIn: process.env.JWT_EXPIRATION || '7d' }
    );

    res.json({
      token,
      user: {
        id: usuario.id,
        email: usuario.email,
        name: usuario.name,
        role: usuario.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
});

// ==================== FINANÇAS ====================

// GET /api/financas
app.get('/api/financas', autenticar, (req, res) => {
  const transacoesUsuario = transacoes.filter(t => t.usuarioId === req.usuario.id);
  res.json(transacoesUsuario);
});

// POST /api/financas
app.post('/api/financas', autenticar, (req, res) => {
  try {
    const { tipo, categoria, descricao, valor, data, membro } = req.body;

    if (!tipo || !categoria || !valor || !data) {
      return res.status(400).json({ message: 'Campos obrigatórios não preenchidos' });
    }

    const novaTransacao = {
      id: transacoes.length + 1,
      tipo,
      categoria,
      descricao,
      valor: parseFloat(valor),
      data,
      membro: membro || '-',
      usuarioId: req.usuario.id,
    };

    transacoes.push(novaTransacao);
    res.status(201).json(novaTransacao);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar transação' });
  }
});

// PUT /api/financas/:id
app.put('/api/financas/:id', autenticar, (req, res) => {
  const transacao = transacoes.find(t => t.id === parseInt(req.params.id));

  if (!transacao) {
    return res.status(404).json({ message: 'Transação não encontrada' });
  }

  if (transacao.usuarioId !== req.usuario.id) {
    return res.status(403).json({ message: 'Sem permissão' });
  }

  const { tipo, categoria, descricao, valor, data, membro } = req.body;
  
  transacao.tipo = tipo || transacao.tipo;
  transacao.categoria = categoria || transacao.categoria;
  transacao.descricao = descricao || transacao.descricao;
  transacao.valor = valor || transacao.valor;
  transacao.data = data || transacao.data;
  transacao.membro = membro || transacao.membro;

  res.json(transacao);
});

// DELETE /api/financas/:id
app.delete('/api/financas/:id', autenticar, (req, res) => {
  const index = transacoes.findIndex(t => t.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: 'Transação não encontrada' });
  }

  const transacao = transacoes[index];

  if (transacao.usuarioId !== req.usuario.id) {
    return res.status(403).json({ message: 'Sem permissão' });
  }

  const removida = transacoes.splice(index, 1);
  res.json({ message: 'Transação removida', transacao: removida[0] });
});

// ==================== MEMBROS ====================

// GET /api/membros
app.get('/api/membros', autenticar, (req, res) => {
  const membrosUsuario = membros.filter(m => m.usuarioId === req.usuario.id);
  res.json(membrosUsuario);
});

// POST /api/membros
app.post('/api/membros', autenticar, (req, res) => {
  try {
    const { nome, email, telefone, status, dataAdmissao, contribuicao } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ message: 'Nome e email são obrigatórios' });
    }

    const novoMembro = {
      id: membros.length + 1,
      nome,
      email,
      telefone: telefone || '',
      status: status || 'ativo',
      dataAdmissao,
      contribuicao: parseFloat(contribuicao) || 0,
      usuarioId: req.usuario.id,
    };

    membros.push(novoMembro);
    res.status(201).json(novoMembro);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar membro' });
  }
});

// PUT /api/membros/:id
app.put('/api/membros/:id', autenticar, (req, res) => {
  const membro = membros.find(m => m.id === parseInt(req.params.id));

  if (!membro) {
    return res.status(404).json({ message: 'Membro não encontrado' });
  }

  if (membro.usuarioId !== req.usuario.id) {
    return res.status(403).json({ message: 'Sem permissão' });
  }

  const { nome, email, telefone, status, dataAdmissao, contribuicao } = req.body;
  
  membro.nome = nome || membro.nome;
  membro.email = email || membro.email;
  membro.telefone = telefone || membro.telefone;
  membro.status = status || membro.status;
  membro.dataAdmissao = dataAdmissao || membro.dataAdmissao;
  membro.contribuicao = contribuicao || membro.contribuicao;

  res.json(membro);
});

// DELETE /api/membros/:id
app.delete('/api/membros/:id', autenticar, (req, res) => {
  const index = membros.findIndex(m => m.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: 'Membro não encontrado' });
  }

  const membro = membros[index];

  if (membro.usuarioId !== req.usuario.id) {
    return res.status(403).json({ message: 'Sem permissão' });
  }

  const removido = membros.splice(index, 1);
  res.json({ message: 'Membro removido', membro: removido[0] });
});

// ==================== DASHBOARD ====================

// GET /api/dashboard
app.get('/api/dashboard', autenticar, (req, res) => {
  const transacoesUsuario = transacoes.filter(t => t.usuarioId === req.usuario.id);
  const membrosUsuario = membros.filter(m => m.usuarioId === req.usuario.id);

  const receitas = transacoesUsuario
    .filter(t => t.tipo === 'receita')
    .reduce((acc, t) => acc + t.valor, 0);

  const despesas = transacoesUsuario
    .filter(t => t.tipo === 'despesa')
    .reduce((acc, t) => acc + t.valor, 0);

  res.json({
    receitas,
    despesas,
    saldo: receitas - despesas,
    membros: membrosUsuario.length,
  });
});

// ==================== SAÚDE ====================

// GET /api/health
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor Madeira Admin funcionando' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor Madeira Admin rodando em http://localhost:${PORT}`);
  console.log(`📊 API disponível em http://localhost:${PORT}/api`);
});

module.exports = app;
