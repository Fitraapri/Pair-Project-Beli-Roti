'use strict';

const fs = require('fs')

module.exports = {
  up(queryInterface, Sequelize) {
    const product = JSON.parse(fs.readFileSync('./data/PP-products.json', 'utf-8'));
    product.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    });
    return queryInterface.bulkInsert("Products", product, {})
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Products", null, {});
  }
};
