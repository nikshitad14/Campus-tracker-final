const express = require('express');
const router  = express.Router();

const { getAllRoutes, getRouteById, getRouteSchedules } = require('../controllers/routeController');
const { reportDelay, getDelayHistory, getETA }          = require('../controllers/delayController');
const { subscribe, unsubscribe, sendDelayNotification, getRidershipAnalytics } = require('../controllers/subscriptionController');
const { login, logout, getMe }                          = require('../controllers/authController');
const { protect, adminOrDriver, adminOnly }             = require('../middleware/auth');

// ----- Auth (public) -----
router.post('/auth/login',  login);
router.post('/auth/logout', logout);
router.get('/auth/me',      getMe);

// ----- Routes (public - students can view) -----
router.get('/routes',                      getAllRoutes);
router.get('/routes/:id',                  getRouteById);
router.get('/routes/:id/schedules',        getRouteSchedules);
router.get('/delays/:schedule_id/eta',     getETA);

// ----- Subscriptions (students can subscribe) -----
router.post('/subscriptions',              protect, subscribe);
router.delete('/subscriptions',            protect, unsubscribe);

// ----- Delays (driver or admin only) -----
router.post('/delays',                     protect, adminOrDriver, reportDelay);
router.get('/delays/:schedule_id/history', protect, adminOrDriver, getDelayHistory);
router.post('/subscriptions/notify',       protect, adminOrDriver, sendDelayNotification);

// ----- Analytics (admin only) -----
router.get('/analytics/ridership',         protect, adminOnly, getRidershipAnalytics);

module.exports = router;
