"use strict";
const { Model } = require("sequelize");


module.exports = (sequelize, DataTypes) => {

    const { Sequelize } = sequelize;

    class User extends Model {


        static associate(models) {
            // User.belongsToMany(models.Project, {
            //     through: 'ProjectAssignments'
            // })
         }
    }
    User.init(
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
                unique: true
            },
            phone: {
                type: DataTypes.STRING,
                unique: true
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
