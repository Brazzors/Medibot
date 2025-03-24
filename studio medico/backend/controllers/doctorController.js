const Appointment = require('../models/Appointment');

exports.getAppointments = async (req, res) => {
    if (req.user.role !== 'doctor') return res.status(403).json({ message: "Access denied" });

    try {
        const appointments = await Appointment.findByDoctor(req.user.id);
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.confirmAppointment = async (req, res) => {
    if (req.user.role !== 'doctor') return res.status(403).json({ message: "Access denied" });

    try {
        await Appointment.confirm(req.params.id, req.user.id);
        res.json({ message: "Appointment confirmed" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
