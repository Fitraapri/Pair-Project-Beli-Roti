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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Username cannot be empty' },
        notNull: { msg: 'Username cannot be empty' },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Email cannot be empty' },
        notNull: { msg: 'Email cannot be empty' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Password cannot be empty' },
        notNull: { msg: 'Password cannot be empty' }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Role cannot be empty' },
        notNull: { msg: 'Role cannot be empty' }
      }
    }
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