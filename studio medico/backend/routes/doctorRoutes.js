const express = require('express');
const pool = require('../config/db');
const authenticateToken = require('../config/auth');

const router = express.Router();

router.get('/appointments', authenticateToken, async (req, res) => {
    if (req.user.role !== 'doctor') return res.status(403).json({ message: "Access denied" });

    try {
        const [appointments] = await pool.query("SELECT * FROM appointments WHERE doctor_id = ?", [req.user.id]);
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/confirm/:id', authenticateToken, async (req, res) => {
    if (req.user.role !== 'doctor') return res.status(403).json({ message: "Access denied" });

    try {
        await pool.query("UPDATE appointments SET status = 'confirmed' WHERE id = ? AND doctor_id = ?", 
                         [req.params.id, req.user.id]);
        res.json({ message: "Appointment confirmed" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
