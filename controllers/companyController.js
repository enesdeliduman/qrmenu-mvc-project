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
        title: `QR Menüm | ${req.session.name}`,
        company: company,
        menu: menu,
    })
});

module.exports.menuGet = asyncHandler(async (req, res, next) => {
    const categoryId = req.params.id; // `id` -> `categoryId`
    let companyMenu = await Menu.find({ 'company': req.session.companyId });

    // `menu[0].categories` -> `companyMenu[0].categories`
    const categories = companyMenu[0].categories;

    let photos = []

    categories.forEach(category => {
        photos.push(category.photo);
        category.products.forEach(product => {
            if (!photos.includes(product.photo)) {
                photos.push(product.photo)
            }
        })
    })

    // `menu` -> `selectedCategory`
    let selectedCategory = categories.find(category => category._id == categoryId);

    // Render the view with a more descriptive title and selected category
    return res.render("company/menu", {
        title: `QR Menüm | ${req.session.name}`,
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

    res.status(200).send({ category: category, body: req.body });
});
