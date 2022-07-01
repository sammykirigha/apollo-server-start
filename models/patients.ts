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
    department: string,
    date: Date,
    time: string,
    status: "pending" | "complete" | "approved",
    doctor: string,
}

module.exports =  (sequelize: any, DataTypes: any) => {
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
        department: string;
        date: Date;
        time: string;
        status: "pending" | "complete" | "approved";
        doctor: string;

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
            department: {
                type: DataTypes.STRING,
                allowNull: false
            },
            date: {
                type: Sequelize.DATE,
                allowNull: false
            },
            time: {
                type: Sequelize.TIME,
                allowNull: false
            },
            status: {
                type: Sequelize.ENUM("pending", "complete", "approved"),
                defaultValue: "pending",
                allowNull: false
            },
            doctor: {
                type: DataTypes.STRING,
                allowNull: false
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
