require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const estudiantesRoutes = require('./routes/estudiantesRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>API Estudiantes funcionando 🚀</h1>');
});

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.use('/api/estudiantes', estudiantesRoutes);
app.use('/api/users', userRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
  })
  .catch(err => {
    console.error('Error conectando a MongoDB:', err);
  });
