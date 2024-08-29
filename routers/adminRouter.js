const express = require('express');
const router = express.Router();

const adminController = require("../controllers/adminController.js");
const isAuth = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');

const multer = require("../helpers/fileUpload.js")

// Örnek route

router.get('/', isAdmin, adminController.index);
router.get('/companies', isAdmin, adminController.companies);
router.get('/company/delete/:id', isAdmin, adminController.deleteCompany);
router.get('/send-mail', isAdmin, adminController.sendMail);
router.post('/send-mail', isAdmin, adminController.sendMailPost);


module.exports = router;
