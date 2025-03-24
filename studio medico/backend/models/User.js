const pool = require('../config/db');

class User {
    static async create(name, email, password, role) {
        const [result] = await pool.query(
            "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", 
            [name, email, password, role]
        );
        return result.insertId;
    }

    static async findByEmail(email) {
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        return rows[0];
    }
}

module.exports = User;
