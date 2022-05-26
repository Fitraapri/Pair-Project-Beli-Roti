'use strict';

const fs = require('fs')

module.exports = {
  up(queryInterface, Sequelize) {
    const user = JSON.parse(fs.readFileSync('./data/PP-users.json', 'utf-8'));
    user.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    });
    return queryInterface.bulkInsert("Users", user, {})
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
