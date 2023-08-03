'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Quiz extends Model {
        static associate(models) {
            this.hasMany(models.Question, {
                foreignKey: 'quizId',
            });
            this.hasMany(models.Attempt, {
                foreignKey: 'quizId',
            });
            // this.belongsTo(models.User, {
            //     foreignKey: 'userId',
            // });
        }
    }

    Quiz.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        // userId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },
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
            type: DataTypes.STRING,
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
    });

    return Quiz;
};