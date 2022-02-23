'use strict';
const fs = require('fs')
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
   const profiles = JSON.parse(fs.readFileSync('./data/profile.json'))
   return queryInterface.bulkInsert('Profiles', 
   profiles.map(profile => {
     profile.createdAt = new Date()
     profile.updatedAt = new Date()
     return profile
   }), {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Profiles', null, {});
  }
};
