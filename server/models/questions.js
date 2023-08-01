'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Questions.init({
    question_text: DataTypes.STRING,
    correct_answer: DataTypes.INTEGER,
    answer_choices: DataTypes.ARRAY,
    flag: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Questions',
  });
  return Questions;
};