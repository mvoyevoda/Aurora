'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Submission extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  Submission.init({
    submissionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    submissionTest: {
      type: DataTypes.STRING,
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    sequelize,
    modelName: 'Submission',
    tableName: 'submissions',
    timestamps: true,
    underscored: true,
  });

  return Submission;
};
