const Company = require("../Models/Company");
const asyncHandler = require("express-async-handler");
const Menu = require("../Models/Menu");
const sendMail = require("../helpers/sendMail");
const { mailTemp } = require("../helpers/mailTemplate");
const metaTagCreator = require("../helpers/metaTagCreator")

module.exports.index = asyncHandler(async (req, res, next) => {
    let companies = await Company.find()
    let menus = await Menu.find({})

    let totalCompany = companies.length
    let totalProduct = 0;
    let activeCompany = 0;
    menus.forEach((menu, count) => {
        let t = 0
        menu.categories.forEach(category => {
            totalProduct += category.products.length
            t += category.products.length
        })
        if (t > 5) activeCompany++
    });

    res.locals.layout = 'layouts/admin';
    return res.render("admin/index", {
        title: `Anasayfa`,
        totalCompany: totalCompany,
        activeCompany: activeCompany,
        totalProduct: totalProduct,
    })
});

module.exports.companies = asyncHandler(async (req, res, next) => {
    const companies = await Menu.aggregate([
        { $unwind: '$categories' },
        {
            $project: {
                company: 1,
                numProducts: { $size: '$categories.products' }
            }
        },
        {
            $group: {
                _id: {
                    menuId: '$_id',
                    companyId: '$company'
                },
                totalCategories: { $sum: 1 },
                totalProducts: { $sum: '$numProducts' }
            }
        },
        {
            $lookup: {
                from: 'companies', // Şirketler koleksiyonunun adı
                localField: '_id.companyId',
                foreignField: '_id',
                as: 'companyInfo'
            }
        },
        { $unwind: '$companyInfo' },
        {
            $project: {
                _id: 0,
                menuId: '$_id.menuId',
                companyId: '$_id.companyId',
                totalCategories: 1,
                totalProducts: 1,
                'companyInfo.name': 1,
                'companyInfo.telephone': 1,
                'companyInfo.slugfield': 1,
                'companyInfo.emailAddress': 1,
                'companyInfo.qrcode': 1,
                'companyInfo.address': 1,
                'companyInfo._id': 1
            }
        }
    ]);

    res.locals.layout = 'layouts/admin';
    return res.render("admin/companies", {
        title: `Şirketler`,
        companies: companies
    })

});

module.exports.deleteCompany = asyncHandler(async (req, res, next) => {
    await Company.findByIdAndDelete(req.params.id)
    let menu = await Menu.deleteOne({ company: req.params.id })

    return res.redirect("/admin/companies")
});

module.exports.sendMail = asyncHandler(async (req, res, next) => {
    res.locals.layout = 'layouts/admin';
    return res.render("admin/send-mail", {
        title: `Mail gönderimi`,
        // csrfToken: req.csrfToken(),
    })
});

module.exports.sendMailPost = asyncHandler(async (req, res, next) => {
        const { subject, message } = req.body;
        const mail = mailTemp(message,message); // mailTemp fonksiyonundan dönen HTML içeriği

        // Şirketlerden e-posta adreslerini alın
        const companies = await Company.find({}).select('emailAddress -_id');

        // E-posta adreslerinin bir listesini oluşturun
        const emailAddresses = companies.map(company => company.emailAddress);

        // E-posta gönderme işlemini asenkron olarak gerçekleştirin
        for (const email of emailAddresses) {
            await sendMail.sendMail({
                to: email,
                html: mail,
                subject: subject
            });
        }

        res.locals.layout = 'layouts/admin';
        res.redirect('/admin/send-mail');
});