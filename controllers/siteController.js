const Company = require("../Models/Company");
const Menu = require("../Models/Menu");
const Admin = require("../Models/Admin");
const asyncHandler = require("express-async-handler");
const metaTagCreator = require("../helpers/metaTagCreator")
const useragent = require("useragent");
const MobileDetect = require('mobile-detect');

module.exports.index = asyncHandler(async (req, res, next) => {
    res.render("index", {
        title: `${process.env.SITE_NAME} Anasayfa | Ücretsiz QR Menü sistemi`,
        metaTags: metaTagCreator("Ana Sayfa", `Hoş geldiniz! ${process.env.SITE_NAME}'de dijital menüler, QR kod çözücüler ve daha fazlasını keşfedin. Restoranlar ve kafeler için kullanıcı dostu çözümler sunuyoruz.`, "defaultPageImage.jpg", "/")
    })
});

module.exports.menu = asyncHandler(async (req, res, next) => {
    const md = new MobileDetect(req.headers['user-agent']);
    const isMobile = md.mobile() !== null;

    if (isMobile) {
        res.redirect(301, '/'); // Masaüstü cihazlar için yönlendirme
    } else {
        const company = await Company.findOne({ slugfield: req.params.slug }).select("socialMedia name emailAddress telephone photo views");
        if (!company) {
            return res.redirect("/404")
        }
        company.views++
        await company.save()
        const menu = await Menu.find({ company: company._id }).select("categories")
        const categoryNames = []
        const categories = menu[0].categories

        categories.forEach(category => {
            categoryNames.push(category.name)
        });

        const products = []
        res.render("menu", {
            title: `${process.env.SITE_NAME} Anasayfa | Ücretsiz QR Menü sistemi`,
            metaTags: metaTagCreator(),
            categoryNames: categoryNames,
            categories: categories
        })
    }

});

module.exports.undefinedError = asyncHandler(async (req, res, next) => {
    res.render("404", {
        title: `${process.env.SITE_NAME} 404 Undefined`,
        metaTags: metaTagCreator()
    })
});