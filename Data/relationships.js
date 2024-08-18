const Product = require("../Models/Product")
const Company = require("../Models/Company")
const Category = require("../Models/Category")
const slugfield = require('../helpers/slugfield');

const { sequelize } = require("../data/databaseConnect.js");

const relationships = async function () {

  Category.hasMany(Product);
  Product.belongsTo(Category);

  Company.hasMany(Category);
  Category.belongsTo(Company);

  await sequelize.sync();
};

relationships();

module.exports = relationships;