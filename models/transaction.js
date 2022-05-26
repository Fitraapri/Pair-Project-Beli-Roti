'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

     get dateFormat() {
      let formattedDate = (this.updatedAt.toISOString().split(`T`)[0])
      return formattedDate
    }
    static associate(models) {
      // define association here
    }
  }
  Transaction.init({
    uniqueId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
    hooks: {
      beforeCreate(trans, options) {
        let sumPrice = (trans.price * trans.quantity)
        trans.price = sumPrice
      }
    }
  });
  return Transaction;
};