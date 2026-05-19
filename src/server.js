require('dotenv').config();

const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const patientRoutes = require('./routes/patient.routes');
const dentistRoutes = require('./routes/dentist.routes');
const appointmentRoutes = require('./routes/appointment.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/patients', patientRoutes);
app.use('/dentists', dentistRoutes);
app.use('/appointments', appointmentRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API Clínica Odontológica funcionando'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});