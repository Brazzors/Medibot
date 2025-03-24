const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const doctorAvailabilityRoutes = require('./routes/doctorAvailabilityRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotte API
app.use('/auth', authRoutes);
app.use('/patient', patientRoutes);
app.use('/doctor', doctorRoutes);
app.use('/doctor/availability', doctorAvailabilityRoutes);

// Avvio del server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
