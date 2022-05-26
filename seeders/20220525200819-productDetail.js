'use strict';

const fs = require('fs')

module.exports = {
  up(queryInterface, Sequelize) {
    const productDetail = JSON.parse(fs.readFileSync('./data/PP-productDetails.json', 'utf-8'));
    productDetail.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    });
    return queryInterface.bulkInsert("ProductDetails", productDetail, {})
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("ProductDetails", null, {});
  }
};
