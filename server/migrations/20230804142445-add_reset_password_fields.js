'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'resetPasswordToken', {
      type: Sequelize.DataTypes.STRING,
    });
    await queryInterface.addColumn('users', 'resetPasswordExpires', {
      type: Sequelize.DataTypes.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'resetPasswordToken');
    await queryInterface.removeColumn('users', 'resetPasswordExpires');
  },
};
