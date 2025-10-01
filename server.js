
const express = require('express');
const { connectDB } = require('./src/config/database');
const clientesRouter = require('./src/routes/clientes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.get('/', (req, res) => {
  res.send('API de Clientes funcionando!');
});

app.use('/clientes', clientesRouter);
async function startServer() {

  await connectDB(); 
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Endpoint de Clientes: http://localhost:${PORT}/clientes`);
  });
}

startServer();
