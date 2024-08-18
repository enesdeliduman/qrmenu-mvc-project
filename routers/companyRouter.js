const express = require('express');
const router = express.Router();

const companyController = require("../controllers/companyController.js");
const isAuth = require('../middlewares/isAuth');

const multer = require("../helpers/fileUpload.js")

// Örnek route
router.get('/', isAuth, companyController.index);

router.get('/menu/:id', isAuth, companyController.menuGet);
router.post('/menu/:id', isAuth, multer.upload.array('photos', 12), companyController.menuPost);


module.exports = router;
