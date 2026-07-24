const db = require('../models/db');

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token)
    return res.status(401).json({ success: false, message: 'Not logged in' });

  const [[user]] = await db.query(
    `SELECT user_id, name, email, role FROM Users WHERE token = ? AND is_active = TRUE`, [token]
  );

  if (!user)
    return res.status(401).json({ success: false, message: 'Invalid or expired session' });

  req.user = user;
  next();
};

// Only admin and driver can access
const adminOrDriver = (req, res, next) => {
  if (req.user.role === 'student')
    return res.status(403).json({ success: false, message: 'Access denied. Students cannot perform this action.' });
  next();
};

// Only admin can access
const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin')
    return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
  next();
};

module.exports = { protect, adminOrDriver, adminOnly };
