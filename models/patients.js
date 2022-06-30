"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const { Sequelize } = sequelize;

    class Patient extends Model {
        static associate(models) {
            // define association here
        }
    }
    Patient.init(
        {
            id: {
                primaryKey: true,
                allowNull: false,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            firstname: {
                type: DataTypes.STRING,
                required: true,
            },
            lastname: {
                type: DataTypes.STRING,
                required: true,
            },
            email: {
                type: DataTypes.STRING,
                required: true,
            },
            phone: {
                type: DataTypes.STRING,
                required: true,
            },
            gender: {
                type: DataTypes.STRING,
                required: true,
            },
            address: {
                type: DataTypes.STRING,
                required: true,
            },
            department: {
                type: DataTypes.STRING,
                required: true,
            },
            date: {
                type: Sequelize.DATE,
                required: true,
            },
            time: {
                type: Sequelize.TIME,
                required: true,
            },
            status: {
                type: Sequelize.ENUM("pending", "complete", "approved"),
                defaultValue: "pending",
                required: true,
            },
            doctor: {
                type: DataTypes.STRING,
                required: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        },
        {
            sequelize,
            modelName: "patients",
            modelName: "patients",
            timestamps: true,
            freezeTableName: true,
        }
    );
    return Patient;
};
