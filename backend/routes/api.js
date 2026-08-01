const express = require('express');
const router  = express.Router();

const { getAllRoutes, getRouteById, getRouteSchedules } = require('../controllers/routeController');
const { reportDelay, getDelayHistory, getETA }          = require('../controllers/delayController');
const { subscribe, unsubscribe, sendDelayNotification, getRidershipAnalytics } = require('../controllers/subscriptionController');
const { register, login, logout, getMe }                = require('../controllers/authController');
const { protect, adminOrDriver, adminOnly }             = require('../middleware/auth');

router.post('/auth/register', register);
router.post('/auth/login',    login);
router.post('/auth/logout',   logout);
router.get('/auth/me',        getMe);

router.get('/routes',                      getAllRoutes);
router.get('/routes/:id',                  getRouteById);
router.get('/routes/:id/schedules',        getRouteSchedules);
router.get('/delays/:schedule_id/eta',     getETA);

router.post('/delays',                     protect, adminOrDriver, reportDelay);
router.get('/delays/:schedule_id/history', protect, adminOrDriver, getDelayHistory);
router.post('/subscriptions/notify',       protect, adminOrDriver, sendDelayNotification);

router.post('/subscriptions',              protect, subscribe);
router.delete('/subscriptions',            protect, unsubscribe);

router.get('/analytics/ridership',         protect, adminOnly, getRidershipAnalytics);

module.exports = router;