const pool = require('../config/db');

class Appointment {
    static async create(patientId, doctorId, appointmentDate) {
        const [result] = await pool.query(
            "INSERT INTO appointments (patient_id, doctor_id, appointment_date, status) VALUES (?, ?, ?, 'pending')", 
            [patientId, doctorId, appointmentDate]
        );
        return result.insertId;
    }

    static async findByDoctor(doctorId) {
        const [rows] = await pool.query("SELECT * FROM appointments WHERE doctor_id = ?", [doctorId]);
        return rows;
    }

    static async confirm(id, doctorId) {
        await pool.query(
            "UPDATE appointments SET status = 'confirmed' WHERE id = ? AND doctor_id = ?", 
            [id, doctorId]
        );
    }

    static async delete(id, patientId) {
        await pool.query("DELETE FROM appointments WHERE id = ? AND patient_id = ?", [id, patientId]);
    }
}

module.exports = Appointment;
