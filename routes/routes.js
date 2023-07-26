var express = require('express');
var userController = require('../src/userController');
const router = express.Router();

router.route('/user/save').post(userController.saveUserInfoController);

router.route('/user/login').post(userController.loginUserInfoController);

module.exports = router;