const express = require('express');
const router = express.Router();

//Controller
const authCtrl = require('../Controllers/authController.js');

//Middlewares
const validUser = require('../middlewares/user/validUser');

router.post('/signup', validUser, authCtrl.signup);
router.post('/login', authCtrl.login);

module.exports = router;