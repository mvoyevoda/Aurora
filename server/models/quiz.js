'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Quiz extends Model {
      static associate(models) {
        // hasMany association since one quiz has many questions
        Quiz.hasMany(models.Question, {
            foreignKey: 'quizId',
            as: 'questions'
        });
      }
    }

    Quiz.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
        },
        language: {
            type: DataTypes.STRING,
        },
        title: {
            type: DataTypes.STRING,
        },
        difficulty: {
            type: DataTypes.INTEGER,
        },
        quizLength: {
            type: DataTypes.INTEGER,
        },
        avgScore: {
            type: DataTypes.INTEGER,
        },
        avgTime: {
            type: DataTypes.INTEGER,
        },
    }, {
        sequelize,
        modelName: 'Quiz',
        tableName: 'quizzes',
        timestamps: true,
        underscored: true,
    });

    return Quiz;
};