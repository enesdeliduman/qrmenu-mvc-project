const express = require("express")
const router = express.Router()

const authRouter = require("./authRouter")
const companyRouter = require("./companyRouter")
const adminRouter = require("./adminRouter")
const siteRouter = require("./siteRouter")
const isAuth = require("../middlewares/isAuth")
const isNotAuth = require("../middlewares/isNotAuth")
const metaTagCreator = require("../helpers/metaTagCreator")


router.use("/", siteRouter)
router.use("/auth", authRouter)
router.use("/company", companyRouter)
router.use("/admin", adminRouter)


module.exports = router