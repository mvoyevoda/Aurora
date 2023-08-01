'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quizzes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Quizzes.init({
    categeory: DataTypes.STRING,
    language: DataTypes.STRING,
    title: DataTypes.STRING,
    difficulty: DataTypes.INTEGER,
    quiz_length: DataTypes.INTEGER,
    avg_score: DataTypes.INTEGER,
    avg_time: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Quizzes',
  });
  return Quizzes;
};