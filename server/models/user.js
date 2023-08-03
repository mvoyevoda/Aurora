'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            this.hasMany(models.Attempt, {
                foreignKey: 'userId',
            });
            this.hasMany(models.Quiz, {
                foreignKey: 'userId',
            });
        }
    }

    User.init({
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
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bestCategory: {
            type: DataTypes.STRING,
        },
        worstCategory: {
            type: DataTypes.STRING,
        },
        favoriteCategory: {
            type: DataTypes.STRING,
        },
        accountType: {
            type: DataTypes.INTEGER,
        },
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
    });
    return User;
};