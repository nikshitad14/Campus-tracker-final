const db = require('../models/db');
const crypto = require('crypto');

const hashPassword = (password) =>
  crypto.createHash('sha256').update(password).digest('hex');

const register = async (req, res) => {
  try {
    const { name, email, password, role, branch, year } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ success: false, message: 'Name, email and password are required' });

    const [[existing]] = await db.query(`SELECT user_id FROM Users WHERE email = ?`, [email]);
    if (existing)
      return res.status(400).json({ success: false, message: 'Email already registered. Please login.' });

    const hashed = hashPassword(password);
    await db.query(
      `INSERT INTO Users (name, email, password, role, branch, year) VALUES (?, ?, ?, ?, ?, ?)`,
      [name, email, hashed, role || 'student', branch || null, year || null]
    );
    res.json({ success: true, message: 'Account created successfully! Please login.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email and password required' });

    const [[user]] = await db.query(
      `SELECT * FROM Users WHERE email = ? AND is_active = TRUE`, [email]
    );
    if (!user)
      return res.status(401).json({ success: false, message: 'Invalid email or password' });

    if (user.password !== hashPassword(password))
      return res.status(401).json({ success: false, message: 'Invalid email or password' });

    const token = crypto.randomBytes(32).toString('hex');
    await db.query(`UPDATE Users SET token = ? WHERE user_id = ?`, [token, user.user_id]);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
        department_id: user.department_id,
        branch: user.branch,
        year: user.year
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const logout = async (req, res) => {
  try {
    const { token } = req.body;
    await db.query(`UPDATE Users SET token = NULL WHERE token = ?`, [token]);
    res.json({ success: true, message: 'Logged out' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getMe = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'No token' });

    const [[user]] = await db.query(
      `SELECT user_id, name, email, role, department_id, branch, year
       FROM Users WHERE token = ? AND is_active = TRUE`, [token]
    );
    if (!user) return res.status(401).json({ success: false, message: 'Invalid token' });

    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { register, login, logout, getMe };