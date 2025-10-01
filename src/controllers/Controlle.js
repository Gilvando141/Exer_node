
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    return res.json(clientes);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor ao listar clientes.' });
  }
});
