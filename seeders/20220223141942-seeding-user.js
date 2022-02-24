'use strict';
const fs = require('fs');
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const users = JSON.parse(fs.readFileSync('./data/users.json'))
     return queryInterface.bulkInsert('Users', 
     users.map(user => {
       user.createdAt = new Date()
       user.updatedAt = new Date()
       return user
     }), {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return  queryInterface.bulkDelete('Users', null, {});
  }
};
