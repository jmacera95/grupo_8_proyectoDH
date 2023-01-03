const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const multerUsersMiddleware = require('../middlewares/multerUsersMiddleware');
const {registerValidations,editValidations,loginValidations} = require('../validations/usersValidations');

router.get('/register', guestMiddleware, usersController.register );
router.post('/register', multerUsersMiddleware.single('image'),registerValidations,usersController.postRegister );

router.get('/login', guestMiddleware, usersController.login);
router.post('/login',loginValidations,usersController.processLogin);

router.get('/profile', authMiddleware, usersController.profile);

router.get('/edit/:id', usersController.edit)
router.put('/edit/:id', editValidations ,usersController.actualizar);
router.delete('/delete/:id', usersController.delete);

router.get('/logout', usersController.logout);

module.exports = router;