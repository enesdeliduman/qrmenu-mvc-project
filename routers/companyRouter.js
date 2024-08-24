const express = require('express');
const router = express.Router();

const companyController = require("../controllers/companyController.js");
const isAuth = require('../middlewares/isAuth');

const multer = require("../helpers/fileUpload.js")

// Örnek route
router.get('/', isAuth, companyController.index);
router.post('/', isAuth, companyController.bulkCreateAtIndex);

router.get('/menu/:id', isAuth, companyController.menuGet);
router.post('/menu/:id', isAuth, multer.upload.array('photos', 10), companyController.menuPost);

router.get('/profile', isAuth, companyController.profileGet);
router.post('/profile', isAuth, multer.upload.single('photo'), companyController.profilePost);


module.exports = router;
