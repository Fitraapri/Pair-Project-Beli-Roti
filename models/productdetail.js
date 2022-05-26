'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    get dateFormat() {
      let formattedDate = (this.createdAt.toISOString().split(`T`)[0])
      return formattedDate
    }
    static associate(models) {
      // define association here
      ProductDetail.hasOne(models.Product, {
        foreignKey: 'ProductDetailId'
      })
    }
  }
  ProductDetail.init({
    ingredients: DataTypes.STRING,
    createdAt: DataTypes.STRING,
    origin: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductDetail',
  });
  return ProductDetail;
};