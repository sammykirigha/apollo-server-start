"use strict";
import { Model } from "sequelize";

type UserAttributes = {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
}

module.exports = (sequelize: any, DataTypes: any) => {

    const { Sequelize } = sequelize;

    class User extends Model<UserAttributes> implements UserAttributes {

        id: string;
        firstname: string;
        lastname: string;
        email: string;
        phone: string

        static associate(models: any) {
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
            },
            lastname: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
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
