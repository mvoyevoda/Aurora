'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Submission extends Model {
        static associate(models) {
            this.belongsTo(models.Attempt, {
                foreignKey: 'attemptId',
            });
            this.belongsTo(models.Question, {
                foreignKey: 'questionId',
            });
        }
    }

    Submission.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        submissionText: {
            type: DataTypes.STRING,
        },
        isCorrect: {
            type: DataTypes.BOOLEAN,
        },
        attemptId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        questionId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Submission',
        tableName: 'submissions',
        timestamps: true,
        // underscored: true,
    });
    return Submission;
};
