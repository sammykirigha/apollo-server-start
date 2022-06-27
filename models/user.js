"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const { Sequelize } = sequelize;
    class User extends Model {
        static associate(models) {}
    }
    User.init(
        {
            id: {
                primaryKey: true,
                allowNull: false,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            username: {
                type: DataTypes.STRING,
                required: true,
            },
            name: {
                type: DataTypes.STRING,
                required: true,
            },
        },
        {
            sequelize,
            modelName: "users",
            tableName: "users",
            timestamps: true,
            freezeTableName: true,
        }
    );
    return User;
};
