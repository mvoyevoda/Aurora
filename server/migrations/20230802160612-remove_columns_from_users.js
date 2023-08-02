'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'quizzesGenerated');
    await queryInterface.removeColumn('users', 'premiumAccount');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'quizzesGenerated', {
      type: Sequelize.INTEGER,
      allowNull: true, // or any other options
    });
    await queryInterface.addColumn('users', 'premiumAccount', {
      type: Sequelize.BOOLEAN,
      allowNull: true, // or any other options
    });
  }
};