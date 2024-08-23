const Company = require("../Models/Company");
const asyncHandler = require("express-async-handler");
const Menu = require("../Models/Menu");

module.exports.index = asyncHandler(async (req, res, next) => {
    const company = await Company.findById(req.session.companyId)
    const menu = await Menu.findOne({
        company: req.session.companyId
    })
    var locals = {
        title: 'Page Title',
        description: 'Page Description',
        header: 'Page Header'
    };
    return res.render("company/index", {
        title: `Kare Menüm | ${req.session.name}`,
        company: company,
        menu: menu,
    })
});

module.exports.menuGet = asyncHandler(async (req, res, next) => {
    const categoryId = req.params.id; // `id` -> `categoryId`
    let companyMenu = await Menu.find({ 'company': req.session.companyId });

    // `menu[0].categories` -> `companyMenu[0].categories`
    const categories = companyMenu[0].categories;

    let photos = companyMenu[0].photos

    // `menu` -> `selectedCategory`
    let selectedCategory = categories.find(category => category._id == categoryId);

    // Render the view with a more descriptive title and selected category
    return res.render("company/menu", {
        title: `Kare Menüm | ${req.session.name}`,
        selectedCategory: selectedCategory,
        photos: photos
    });
});

module.exports.menuPost = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const { categoryName, categoryDescription, categoryDefPhoto, names, descriptions, prices, productDefPhotos } = req.body;

    // Find the menu for the current company
    let menu = await Menu.findOne({ company: req.session.companyId });
    if (!menu) return res.status(404).send({ error: "Menu not found" });



    req.files.forEach(file => {
        menu.photos.unshift(file.originalname)
    })

    let category = menu.categories.id(id);

    // Update category details
    category.name = categoryName;
    category.description = categoryDescription;
    category.photo = categoryDefPhoto;

    // Update existing products
    Object.keys(names).forEach(prodId => {
        const product = category.products.id(prodId);
        if (product) {
            product.name = names[prodId];
            product.description = descriptions[prodId] || product.description;
            product.price = parseInt(prices[prodId]) || product.price;
            product.photo = productDefPhotos[prodId] || product.photo;
        }
    });

    // Add new products
    Object.keys(req.body).forEach(key => {
        if (key.startsWith("newProduct-")) {
            const newProduct = req.body[key];
            category.products.push({
                name: newProduct.name || "",
                description: newProduct.description || "",
                price: parseInt(newProduct.price) || 0,
                photo: newProduct.productDefPhoto
            });
        }
    });
    // Save the menu
    await menu.save();

    return res.redirect(req.originalUrl)
});

module.exports.profileGet = asyncHandler(async (req, res, next) => {
    const errors = req.session.errors || [];
    const formData = req.session.formData || {};

    req.session.errors = null;
    req.session.formData = null;


    const company = await Company.findById(req.session.companyId)

    return res.render("company/profile", {
        title: `Kare Menüm | ${req.session.name} profil`,
        company: company,
        errors: errors,
        formData: formData
    });
});

module.exports.profilePost = asyncHandler(async (req, res, next) => {
    const { name, emailAddress, telephone, address, instagram, facebook, twitter, youtube } = req.body
    let company = await Company.findById(req.session.companyId);

    let profilePhoto
    if (req.file) {
        profilePhoto = req.file.originalname
    }

    company.name = name,
        company.emailAddress = emailAddress,
        company.telephone = telephone,
        company.address = address,
        company.socialMedia.instagram = instagram,
        company.socialMedia.facebook = facebook,
        company.socialMedia.youtube = youtube,
        company.socialMedia.twitter = twitter
    company.photo = profilePhoto ??= company.photo

    await company.save();

    req.session.name = name;
    req.session.email = emailAddress;
    req.session.telephone = telephone;
    req.session.address = address;
    req.session.socialMedia.instagram = instagram;
    req.session.socialMedia.facebook = facebook;
    req.session.socialMedia.youtube = youtube;
    req.session.qrcode = company.qrcode;
    req.session.socialMedia.twitter = twitter;
    req.session.photo = profilePhoto ??= company.photo;



    return res.redirect('/')
});