'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Question extends Model {
      static associate(models) {
        this.belongsTo(models.Quiz, {
          foreignKey: 'quizId',
        });
        this.hasMany(models.Submission, {
          foreignKey: 'questionId',
        });
      }
    }

    Question.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        quizId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        questionText: {
            type: DataTypes.STRING,
        },
        correctAnswer: {
            type: DataTypes.INTEGER,
        },
        answerChoices: {
            type: DataTypes.ARRAY(DataTypes.STRING),
        },
        questionType: {
            type: DataTypes.INTEGER,
        },
        flag: {
            type: DataTypes.BOOLEAN,
        },
    }, {
        sequelize,
        modelName: 'Question',
        tableName: 'questions',
        timestamps: true,
        // underscored: true,
    });
    return Question;
};