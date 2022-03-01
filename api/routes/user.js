const express       = require('express');
const router        = express.Router();

//Controller
const userCtrller  = require('../controllers/userController.js');

//Middlewares
const validUser = require('../middlewares/user/validUser');

//Routes
router.post('/', validUser, userCtrller.createUser);

module.exports = router;