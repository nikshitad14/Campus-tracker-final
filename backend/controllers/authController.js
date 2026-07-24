const db = require('../models/db');
const crypto = require('crypto');

// Simple hash function (no bcrypt needed for college project)
const hashPassword = (password) =>
  crypto.createHash('sha256').update(password).digest('hex');

// POST /api/auth/login
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

    const hashed = hashPassword(password);
    if (user.password !== hashed)
      return res.status(401).json({ success: false, message: 'Invalid email or password' });

    // Simple session token
    const token = crypto.randomBytes(32).toString('hex');

    // Store token in DB
    await db.query(
      `UPDATE Users SET token = ? WHERE user_id = ?`, [token, user.user_id]
    );

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user_id:  user.user_id,
        name:     user.name,
        email:    user.email,
        role:     user.role
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/auth/logout
const logout = async (req, res) => {
  try {
    const { token } = req.body;
    await db.query(`UPDATE Users SET token = NULL WHERE token = ?`, [token]);
    res.json({ success: true, message: 'Logged out' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/auth/me  (verify token)
const getMe = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
      return res.status(401).json({ success: false, message: 'No token' });

    const [[user]] = await db.query(
      `SELECT user_id, name, email, role FROM Users WHERE token = ? AND is_active = TRUE`, [token]
    );

    if (!user)
      return res.status(401).json({ success: false, message: 'Invalid token' });

    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { login, logout, getMe };
