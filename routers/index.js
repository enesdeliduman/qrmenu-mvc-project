const express = require("express")
const router = express.Router()

const authRouter = require("./authRouter")
const companyRouter = require("./companyRouter")
const isAuth = require("../middlewares/isAuth")
const isNotAuth = require("../middlewares/isNotAuth")

router.get("/",isNotAuth, (req, res) => {
    res.render("index", {
        title: "Anasayfa"
    })
})

router.use("/auth", authRouter)
router.use("/company", companyRouter)


module.exports = router