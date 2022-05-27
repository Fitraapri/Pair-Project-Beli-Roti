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

    static formattedPrice() {
      let formattedPrice = this.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
      return formattedPrice
    }
    static associate(models) {
      // define association here
      Product.belongsTo(models.ProductDetail, { foreignKey: "ProductDetailId" });
      Product.hasMany(models.Transaction, { foreignKey: "ProductId" })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Username cannot be empty' },
        notNull: { msg: 'Username cannot be empty' },
      }
    },
    imageUrl: DataTypes.STRING,
    like: DataTypes.INTEGER,
    ProductDetailId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};