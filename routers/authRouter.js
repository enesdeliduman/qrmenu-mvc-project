const express = require('express');
const router = express.Router();

const authController = require("../controllers/authController");
const isNotAuth = require('../middlewares/isNotAuth');
const isAuth = require('../middlewares/isAuth');

// Örnek route
router.get('/login', isNotAuth, authController.getLogin);
router.post('/login', authController.postLogin);

router.get('/register', isNotAuth, authController.getRegister);
router.post('/register', authController.postRegister);

router.get('/logout', isAuth, authController.logout);


module.exports = router;
