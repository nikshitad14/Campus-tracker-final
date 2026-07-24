const db = require('../models/db');

// GET all routes with stop count
const getAllRoutes = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT r.*, COUNT(s.stop_id) AS total_stops
      FROM Routes r
      LEFT JOIN Stops s ON r.route_id = s.route_id
      WHERE r.is_active = TRUE
      GROUP BY r.route_id
      ORDER BY r.route_code
    `);
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET single route with all stops
const getRouteById = async (req, res) => {
  try {
    const { id } = req.params;
    const [[route]] = await db.query(`SELECT * FROM Routes WHERE route_id = ?`, [id]);
    if (!route) return res.status(404).json({ success: false, message: 'Route not found' });

    const [stops] = await db.query(
      `SELECT * FROM Stops WHERE route_id = ? ORDER BY stop_order`, [id]
    );
    res.json({ success: true, data: { ...route, stops } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET schedules for a route
const getRouteSchedules = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(`
      SELECT sc.*, b.bus_number, b.driver_name, b.driver_phone,
             r.route_name, r.route_code
      FROM Schedules sc
      JOIN Buses b ON sc.bus_id = b.bus_id
      JOIN Routes r ON sc.route_id = r.route_id
      WHERE sc.route_id = ? AND sc.is_active = TRUE
      ORDER BY sc.departure_time
    `, [id]);
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAllRoutes, getRouteById, getRouteSchedules };
