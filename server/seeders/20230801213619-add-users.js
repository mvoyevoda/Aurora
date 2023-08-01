'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        userName: 'JohnDoe',
        email: 'john.doe@example.com',
        password: await bcrypt.hash('password123', 10),
        quizzesGenerated: 'Quiz Data for John',
        bestCategory: 'History',
        worstCategory: 'Math',
        favoriteCategory: 'Science',
        accountType: 1, // Regular user
        premiumAccount: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userName: 'JaneSmith',
        email: 'jane.smith@example.com',
        password: await bcrypt.hash('hello123', 10),
        quizzesGenerated: 'Jane\'s Quiz Data',
        bestCategory: 'Science',
        worstCategory: 'English',
        favoriteCategory: 'Math',
        accountType: 2, // Moderator user
        premiumAccount: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userName: 'AliceWonderland',
        email: 'alice.wonderland@example.com',
        password: await bcrypt.hash('mypassword', 10),
        quizzesGenerated: 'Alice\'s Quizzes',
        bestCategory: 'Art',
        worstCategory: 'History',
        favoriteCategory: 'Literature',
        accountType: 3, // Admin user
        premiumAccount: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
