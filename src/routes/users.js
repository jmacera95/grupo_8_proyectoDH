const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/register', guestMiddleware, usersController.register );

router.get('/login', guestMiddleware, usersController.login);
router.post('/login', usersController.processLogin);

router.get('/profile', authMiddleware, usersController.profile);

module.exports = router;