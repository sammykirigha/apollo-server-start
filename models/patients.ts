"use strict";
import { Model } from "sequelize";

type PatientAttributes = {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    phone: string,
    gender: string,
    address: string,
    confirmed: boolean,
    confirmToken: string,
    passwordResetToken: string,
    passwordResetExpires: Date
}

module.exports = (sequelize: any, DataTypes: any) => {
    const { Sequelize } = sequelize;

    class Patient extends Model<PatientAttributes> implements PatientAttributes {
        id: string;
        firstname: string;
        lastname: string;
        email: string;
        password: string;
        phone: string;
        gender: string;
        address: string;
        confirmed: boolean;
        confirmToken: string;
        passwordResetToken: string
        passwordResetExpires: Date

        static associate(models: any) {
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
                allowNull: false
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: false
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false
            },
            confirmed: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            confirmToken: {
                type: Sequelize.STRING,
                allowNull: true
            },
            passwordResetToken: {
                type: Sequelize.STRING,
                allowNull: true
            },
            passwordResetExpires: {
                type: Sequelize.DATE,
                allowNull: true
            },
        },
        {
            sequelize,
            modelName: "patients",
            tableName: "patients",
            timestamps: true,
            freezeTableName: true,
        }
    );
    return Patient;
};
