'use strict';
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('ProductDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ingredients: {
        type: Sequelize.STRING
      },
      dateProduct: {
        type: Sequelize.DATE
      },
      origin: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('ProductDetails');
  }
};