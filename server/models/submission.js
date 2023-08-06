'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Submission extends Model {
        static associate(models) {
            // Association to the Attempt model
            this.belongsTo(models.Attempt, {
                foreignKey: 'attemptId',
            });

            // Association to the Question model
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
        submissionChoice: {
            type: DataTypes.STRING,  // Ensure the data type matches your database setup.
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
    });

    return Submission;
};
