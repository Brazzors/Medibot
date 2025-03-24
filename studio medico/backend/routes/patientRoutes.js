const express = require('express');
const pool = require('../config/db');
const authenticateToken = require('../config/auth');

const router = express.Router();

router.post('/book', authenticateToken, async (req, res) => {
    if (req.user.role !== 'patient') return res.status(403).json({ message: "Access denied" });

    const { doctor_id, appointment_date } = req.body;

    try {
        await pool.query("INSERT INTO appointments (patient_id, doctor_id, appointment_date, status) VALUES (?, ?, ?, 'pending')", 
                         [req.user.id, doctor_id, appointment_date]);
        res.json({ message: "Appointment booked" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/cancel/:id', authenticateToken, async (req, res) => {
    try {
        await pool.query("DELETE FROM appointments WHERE id = ? AND patient_id = ?", 
                         [req.params.id, req.user.id]);
        res.json({ message: "Appointment canceled" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
