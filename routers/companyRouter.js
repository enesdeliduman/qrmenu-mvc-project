const express = require('express');
const router = express.Router();

const companyController = require("../controllers/companyController.js");
const isAuth = require('../middlewares/isAuth');

const multer = require("../helpers/fileUpload.js");
const isCompany = require('../middlewares/isCompany.js');

// Örnek route
router.get('/', isAuth, isCompany, companyController.index);
router.post('/', isAuth, isCompany, companyController.bulkCreateAtIndex);

router.get('/menu/:id', isAuth, isCompany, companyController.menuGet);
router.post('/menu/:id', isAuth, isCompany, multer.upload.array('photos', 10), companyController.menuPost);

router.get('/profile', isAuth, isCompany, companyController.profileGet);
router.post('/profile', isAuth, isCompany, multer.upload.single('photo'), companyController.profilePost);

router.get('/new-menu', isAuth, isCompany, companyController.newMenu);

module.exports = router;
