'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Quizzes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categeory: {
        type: Sequelize.STRING
      },
      language: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      difficulty: {
        type: Sequelize.INTEGER
      },
      quiz_length: {
        type: Sequelize.INTEGER
      },
      avg_score: {
        type: Sequelize.INTEGER
      },
      avg_time: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Quizzes');
  }
};