'use strict';
const fs = require('fs');
module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const tags = JSON.parse(fs.readFileSync('./data/tags.json'))
    return queryInterface.bulkInsert('Tags', 
    tags.map(tags => {
      tags.createdAt = new Date()
      tags.updatedAt = new Date()
      return tags
    }), {});
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Tags', null, {} )
  }
};
