const pool = require('../config/db');

class DoctorAvailability {
    static async create(doctorId, availableDate, startTime, endTime) {
        const [result] = await pool.query(
            "INSERT INTO doctor_availability (doctor_id, available_date, start_time, end_time) VALUES (?, ?, ?, ?)", 
            [doctorId, availableDate, startTime, endTime]
        );
        return result.insertId;
    }

    static async findByDoctor(doctorId) {
        const [rows] = await pool.query("SELECT * FROM doctor_availability WHERE doctor_id = ?", [doctorId]);
        return rows;
    }

    static async delete(id, doctorId) {
        await pool.query("DELETE FROM doctor_availability WHERE id = ? AND doctor_id = ?", [id, doctorId]);
    }
}

module.exports = DoctorAvailability;
