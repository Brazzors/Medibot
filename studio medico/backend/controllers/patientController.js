const Appointment = require('../models/Appointment');

exports.bookAppointment = async (req, res) => {
    if (req.user.role !== 'patient') return res.status(403).json({ message: "Access denied" });

    const { doctor_id, appointment_date } = req.body;
    try {
        const appointmentId = await Appointment.create(req.user.id, doctor_id, appointment_date);
        res.json({ message: "Appointment booked", appointmentId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.cancelAppointment = async (req, res) => {
    try {
        await Appointment.delete(req.params.id, req.user.id);
        res.json({ message: "Appointment canceled" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
