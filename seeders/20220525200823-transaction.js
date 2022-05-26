'use strict';

const fs = require('fs')

module.exports = {
  up(queryInterface, Sequelize) {
    const trans = JSON.parse(fs.readFileSync('./data/PP-transactions.json', 'utf-8'));
    trans.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    });
    return queryInterface.bulkInsert("Transactions", trans, {})
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Transactions", null, {});
  }
};
