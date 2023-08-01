'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // Define associations here if needed
        }
    }

    User.init({
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        quizzesGenerated: {
            type: DataTypes.STRING,
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
        premiumAccount: {
            type: DataTypes.BOOLEAN,
        },
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        underscored: true,
        timestamps: true,
    });
    return User;
};