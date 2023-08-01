'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Attempt extends Model {
        static associate(models) {
            //associations
        }
    }

    Attempt.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        score: {
            type: DataTypes.INTEGER,
        },
        progress: {
            type: DataTypes.INTEGER,
        },
        timeTaken: {
            type: DataTypes.INTEGER,
        },
    }, {
        sequelize,
        modelName: 'Attempt',
        tableName: 'attempts',
        timestamps: true,
        underscored: true,
    });
    return Attempt;
};