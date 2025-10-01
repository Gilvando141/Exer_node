
const express = require('express');
const router = express.Router();
const Cliente = require('./src/models/Cliente');
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    return res.json(clientes);
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    return res.status(500).json({ error: 'Erro interno do servidor ao listar clientes.' });
  }
});

router.post('/', async (req, res) => {

  const { nome, email, telefone } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ error: 'Nome e email são obrigatórios.' });
  }

  try {
    const novoCliente = await Cliente.create({ nome, email, telefone });
    return res.status(201).json(novoCliente);
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error);
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'O email fornecido já está cadastrado.' });
    }
    
    return res.status(500).json({ error: 'Erro interno do servidor ao cadastrar cliente.' });
  }
});

module.exports = router;
