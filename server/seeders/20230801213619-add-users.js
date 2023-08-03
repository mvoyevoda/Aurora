'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        userName: 'JohnDoe',
        email: 'john.doe@example.com',
        password: await bcrypt.hash('password123', 10),
        bestCategory: 'History',
        worstCategory: 'Math',
        favoriteCategory: 'Science',
        accountType: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userName: 'JaneSmith',
        email: 'jane.smith@example.com',
        password: await bcrypt.hash('hello123', 10),
        bestCategory: 'Science',
        worstCategory: 'English',
        favoriteCategory: 'Math',
        accountType: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userName: 'AliceWonderland',
        email: 'alice.wonderland@example.com',
        password: await bcrypt.hash('mypassword', 10),
        bestCategory: 'Art',
        worstCategory: 'History',
        favoriteCategory: 'Literature',
        accountType: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
