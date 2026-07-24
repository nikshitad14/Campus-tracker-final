const db = require('../models/db');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

// POST subscribe to a route
const subscribe = async (req, res) => {
  try {
    const { student_name, student_email, student_phone, route_id, notification_type } = req.body;
    if (!student_name || !student_email || !route_id)
      return res.status(400).json({ success: false, message: 'name, email, route_id required' });

    await db.query(
      `INSERT INTO Subscriptions (student_name, student_email, student_phone, route_id, notification_type)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE is_active = TRUE, notification_type = ?`,
      [student_name, student_email, student_phone || null, route_id,
       notification_type || 'email', notification_type || 'email']
    );

    // Send confirmation email
    const [[route]] = await db.query(`SELECT route_name FROM Routes WHERE route_id = ?`, [route_id]);
    await transporter.sendMail({
      from: `"Campus Bus Tracker" <${process.env.EMAIL_USER}>`,
      to: student_email,
      subject: `Subscribed to Route: ${route?.route_name}`,
      html: `<h2>Hi ${student_name}!</h2>
             <p>You have successfully subscribed to <b>${route?.route_name}</b>.</p>
             <p>You will receive delay notifications for this route.</p>
             <p>— Campus Bus Tracker, VCE</p>`
    }).catch(() => {}); // email fail shouldn't break subscription

    res.json({ success: true, message: 'Subscribed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE unsubscribe
const unsubscribe = async (req, res) => {
  try {
    const { email, route_id } = req.body;
    await db.query(
      `UPDATE Subscriptions SET is_active = FALSE WHERE student_email = ? AND route_id = ?`,
      [email, route_id]
    );
    res.json({ success: true, message: 'Unsubscribed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST send delay notification to all subscribers of a route
const sendDelayNotification = async (req, res) => {
  try {
    const { route_id, schedule_id, delay_minutes, reason } = req.body;
    const [subs] = await db.query(
      `SELECT s.student_name, s.student_email, r.route_name
       FROM Subscriptions s JOIN Routes r ON s.route_id = r.route_id
       WHERE s.route_id = ? AND s.is_active = TRUE AND s.notification_type IN ('email','both')`,
      [route_id]
    );

    const emailPromises = subs.map(sub =>
      transporter.sendMail({
        from: `"Campus Bus Tracker" <${process.env.EMAIL_USER}>`,
        to: sub.student_email,
        subject: `🚌 Delay Alert: ${sub.route_name} — ${delay_minutes} min late`,
        html: `<h2>Bus Delay Notification</h2>
               <p>Hi ${sub.student_name},</p>
               <p>Your bus on <b>${sub.route_name}</b> is delayed by <b>${delay_minutes} minutes</b>.</p>
               ${reason ? `<p>Reason: ${reason}</p>` : ''}
               <p>We apologize for the inconvenience.</p>
               <p>— Campus Bus Tracker, VCE</p>`
      }).catch(() => {})
    );

    await Promise.all(emailPromises);
    res.json({ success: true, message: `Notifications sent to ${subs.length} subscribers` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET ridership analytics per route
const getRidershipAnalytics = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT r.route_name, r.route_code,
             COUNT(s.subscription_id) AS total_subscribers,
             SUM(s.is_active) AS active_subscribers
      FROM Routes r
      LEFT JOIN Subscriptions s ON r.route_id = s.route_id
      GROUP BY r.route_id
      ORDER BY active_subscribers DESC
    `);
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { subscribe, unsubscribe, sendDelayNotification, getRidershipAnalytics };
