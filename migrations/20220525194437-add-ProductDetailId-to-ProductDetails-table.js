'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Products',
      'ProductDetailId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'ProductDetails'
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    )
  },

  down(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Products',
      'ProductDetailId',
      {}
    )
  }
};
