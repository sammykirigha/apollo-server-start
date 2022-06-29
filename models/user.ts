"use strict";
const { Model } = require("sequelize");

interface UserAttributes {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string
};

module.exports = (sequelize: { Sequelize: any; }, DataTypes: { STRING: any; }) => {

    const { Sequelize } = sequelize;

    class User extends Model<UserAttributes> implements UserAttributes {

        id!: string;
        firstname!: string;
        lastname!: string;
        email!: string;
        phone: string

        static associate(models: any) { }
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
