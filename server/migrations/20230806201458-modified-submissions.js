'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add attemptId column
    await queryInterface.addColumn('submissions', 'attemptId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'attempts',
        key: 'id'
      }
    });

    // Add questionId column
    await queryInterface.addColumn('submissions', 'questionId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'questions',
        key: 'id'
      }
    });

    // Add submissionChoice column
    await queryInterface.addColumn('submissions', 'submissionChoice', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    // Remove attemptId column
    await queryInterface.removeColumn('submissions', 'attemptId');
    
    // Remove questionId column
    await queryInterface.removeColumn('submissions', 'questionId');
    
    // Remove submissionChoice column
    await queryInterface.removeColumn('submissions', 'submissionChoice');
  }
};
