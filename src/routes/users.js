const express = require('express');
const router = express.Router();
const path = require('path')
const usersController = require('../controllers/usersController');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer')

const storage = multer.diskStorage(
    {
        destination: (req, file, callback) => {
            callback(null, path.join(__dirname, '../../public/images/usersImage'));
        },
        filename: (req, file, callback) => {
            callback(null, `${Date.now()}_${file.originalname}`); // TODO: verificar si este nombre nos sirve o si deberíamos customizarlo más.
        }
    }
);
const uploadFile = multer({ storage });

router.get('/register',usersController.register );
router.post('/register',uploadFile.single('image') , usersController.postRegister );

router.get('/login', guestMiddleware, usersController.login);
router.post('/login', usersController.processLogin);

router.get('/profile', authMiddleware, usersController.profile);

router.get('/logout', usersController.logout);

module.exports = router;