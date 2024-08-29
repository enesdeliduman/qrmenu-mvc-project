const multer = require('multer')
const path = require('path')
const fs = require('fs');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/")
    },

    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        cb(null, path.parse(file.originalname).name + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage
})

module.exports.upload = upload