const pool = require('../config/db');

const generateAdmissionNo = async () => {
    const result = await pool.query('SELECT COUNT(*) FROM students');
    return "ADM" + (parseInt(result.rows[0].count) + 1).toString().padStart(4, '0');
};

exports.getStudents = async (req, res) => {
    const result = await pool.query('SELECT * FROM students');
    res.json(result.rows);
};

exports.getStudent = async (req, res) => {
    const result = await pool.query('SELECT * FROM students WHERE id=$1', [req.params.id]);
    res.json(result.rows[0]);
};

exports.createStudent = async (req, res) => {
    const admissionNo = await generateAdmissionNo();
    const { name, course, year, dob, email, mobile, gender, address } = req.body;
    const photo = req.file ? req.file.filename : null;

    const result = await pool.query(
        `INSERT INTO students 
        (admission_no, name, course, year, dob, email, mobile, gender, address, photo)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
        [admissionNo, name, course, year, dob, email, mobile, gender, address, photo]
    );

    res.json(result.rows[0]);
};

exports.updateStudent = async (req, res) => {
    const { name, course, year, dob, email, mobile, gender, address } = req.body;

    await pool.query(
        `UPDATE students SET name=$1, course=$2, year=$3, dob=$4, email=$5,
         mobile=$6, gender=$7, address=$8 WHERE id=$9`,
        [name, course, year, dob, email, mobile, gender, address, req.params.id]
    );

    res.send("Updated");
};

exports.deleteStudent = async (req, res) => {
    await pool.query('DELETE FROM students WHERE id=$1', [req.params.id]);
    res.send("Deleted");
};
