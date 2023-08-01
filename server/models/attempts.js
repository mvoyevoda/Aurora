'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attempts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Attempts.init({
    score: DataTypes.INTEGER,
    progress: DataTypes.INTEGER,
    time_taken: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Attempts',
  });
  return Attempts;
};