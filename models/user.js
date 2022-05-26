'use strict';
const bcryptjs = require('bcryptjs');
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Transaction, { foreignKey: "UserId" });
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance, option) {
        const salt = bcryptjs.genSaltSync(8)
        const hash = bcryptjs.hashSync(instance.password, salt)

        instance.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};