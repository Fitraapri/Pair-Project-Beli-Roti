'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

     get formattedPrice() {
      let formattedPrice = `Rp ${this.price.toLocaleString()}`
      return formattedPrice
    }
    static associate(models) {
      // define association here
      Product.belongsTo(models.ProductDetail, {
        foreignKey: 'ProductDetailId'
      }),
      Product.belongsToMany(models.User, { through: models.Transaction })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    like: DataTypes.INTEGER,
    ProductDetailId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};