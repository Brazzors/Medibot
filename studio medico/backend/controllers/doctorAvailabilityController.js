const DoctorAvailability = require('../models/DoctorAvailability');

exports.addAvailability = async (req, res) => {
    if (req.user.role !== 'doctor') return res.status(403).json({ message: "Access denied" });

    const { available_date, start_time, end_time } = req.body;
    try {
        const availabilityId = await DoctorAvailability.create(req.user.id, available_date, start_time, end_time);
        res.json({ message: "Disponibilità aggiunta", availabilityId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getDoctorAvailability = async (req, res) => {
    if (req.user.role !== 'doctor') return res.status(403).json({ message: "Access denied" });

    try {
        const availability = await DoctorAvailability.findByDoctor(req.user.id);
        res.json(availability);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteAvailability = async (req, res) => {
    if (req.user.role !== 'doctor') return res.status(403).json({ message: "Access denied" });

    try {
        await DoctorAvailability.delete(req.params.id, req.user.id);
        res.json({ message: "Disponibilità rimossa" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAvailabilityByDoctor = async (req, res) => {
    try {
        const availability = await DoctorAvailability.findByDoctor(req.params.doctor_id);
        res.json(availability);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
