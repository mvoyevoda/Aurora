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
            // this.hasMany(models.Quiz, {
            //     foreignKey: 'userId',
            // });
        }
    }

    User.init({
        id: {
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
        resetPasswordToken: {
            type: DataTypes.STRING,
        },
        resetPasswordExpires: {
            type: DataTypes.DATE,
        },
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
    });

    return User;
};