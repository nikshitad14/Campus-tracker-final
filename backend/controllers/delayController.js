const db = require('../models/db');

// POST a delay report (driver/admin)
const reportDelay = async (req, res) => {
  try {
    const { schedule_id, delay_minutes, reason, reported_by } = req.body;
    if (!schedule_id || delay_minutes === undefined)
      return res.status(400).json({ success: false, message: 'schedule_id and delay_minutes required' });

    await db.query(
      `INSERT INTO DelayLogs (schedule_id, delay_minutes, reason, reported_by, log_date)
       VALUES (?, ?, ?, ?, CURDATE())`,
      [schedule_id, delay_minutes, reason || null, reported_by || 'admin']
    );
    res.json({ success: true, message: 'Delay reported successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET delay history for a schedule
const getDelayHistory = async (req, res) => {
  try {
    const { schedule_id } = req.params;
    const [rows] = await db.query(
      `SELECT * FROM DelayLogs WHERE schedule_id = ? ORDER BY log_date DESC LIMIT 30`,
      [schedule_id]
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET AI ETA prediction (rule-based)
// Logic: Uses avg delay from last 14 days, day-of-week weight, and time-of-day rush factor
const getETA = async (req, res) => {
  try {
    const { schedule_id } = req.params;

    // Fetch schedule info
    const [[schedule]] = await db.query(
      `SELECT sc.departure_time, sc.arrival_time, sc.days_of_week,
              r.route_name
       FROM Schedules sc JOIN Routes r ON sc.route_id = r.route_id
       WHERE sc.schedule_id = ?`, [schedule_id]
    );
    if (!schedule) return res.status(404).json({ success: false, message: 'Schedule not found' });

    // Get recent delay history (last 14 days)
    const [history] = await db.query(
      `SELECT delay_minutes, DAYOFWEEK(log_date) AS day_of_week
       FROM DelayLogs
       WHERE schedule_id = ? AND log_date >= CURDATE() - INTERVAL 14 DAY`,
      [schedule_id]
    );

    // Rule 1: Average historical delay
    const avgDelay = history.length > 0
      ? history.reduce((sum, r) => sum + r.delay_minutes, 0) / history.length
      : 0;

    // Rule 2: Day-of-week weight (Mon & Fri are busier)
    const todayDOW = new Date().getDay(); // 0=Sun
    const dowWeight = [0, 0.8, 1.2, 1.0, 1.0, 1.3, 0.7][todayDOW] || 1.0;

    // Rule 3: Rush hour factor (7-9am = high traffic)
    const depHour = parseInt(schedule.departure_time.split(':')[0]);
    const rushFactor = (depHour >= 7 && depHour <= 9) ? 1.25 : 1.0;

    const predictedDelay = Math.round(avgDelay * dowWeight * rushFactor);

    // Calculate ETA
    const [h, m] = schedule.arrival_time.split(':').map(Number);
    const etaDate = new Date();
    etaDate.setHours(h, m + predictedDelay, 0);
    const etaStr = etaDate.toTimeString().slice(0, 5);

    res.json({
      success: true,
      data: {
        route_name:       schedule.route_name,
        scheduled_arrival: schedule.arrival_time,
        predicted_delay_minutes: predictedDelay,
        predicted_eta:    etaStr,
        confidence:       history.length >= 5 ? 'high' : history.length >= 2 ? 'medium' : 'low',
        based_on_records: history.length
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { reportDelay, getDelayHistory, getETA };
