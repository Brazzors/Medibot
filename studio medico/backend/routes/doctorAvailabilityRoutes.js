const express = require('express');
const { addAvailability, getDoctorAvailability, deleteAvailability, getAvailabilityByDoctor } = require('../controllers/doctorAvailabilityController');
const authenticateToken = require('../config/auth');

const router = express.Router();

// Rotte per i medici
router.post('/', authenticateToken, addAvailability);
router.get('/', authenticateToken, getDoctorAvailability);
router.delete('/:id', authenticateToken, deleteAvailability);

// Rotta per i pazienti per vedere la disponibilità di un medico
router.get('/:doctor_id', getAvailabilityByDoctor);

module.exports = router;
