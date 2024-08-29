const express = require('express');
const router = express.Router();

const siteController = require("../controllers/siteController");
const isNotAuth = require('../middlewares/isNotAuth');

// Örnek route
router.get('/', isNotAuth, siteController.index);
router.get('/menu/:slug', siteController.menu);
router.get('/404', siteController.undefinedError);

module.exports = router;
