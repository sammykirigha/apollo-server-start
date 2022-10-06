"use strict";
import { Model } from "sequelize";

type PatientAttributes = {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    gender: string,
    age: number,
    address: string,
    image: string;
    dateOfBirth: Date;
    disability: boolean;
    county: string;
    bloodGroup: string;
    nationality: string;
    maritalStatus: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    const { Sequelize } = sequelize;

    class Patient extends Model<PatientAttributes> implements PatientAttributes {
        id: string;
        firstname: string;
        lastname: string;
        email: string;
        phone: string;
        gender: string;
        address: string;
        age: number;
        image: string;
        dateOfBirth: Date;
        disability: boolean;
        county: string;
        bloodGroup: string;
        nationality: string;
        maritalStatus: string;

        static associate(models: any) {
            // define association here
            Patient.hasMany(models.appointments, {
                foreignKey: "patientId"
            });
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
            phone: {
                type: DataTypes.STRING,
                allowNull: false
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: false
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true
            },
            dateOfBirth: {
                type: DataTypes.DATE,
                allowNull: false
            },
            disability: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            county: {
                type: DataTypes.STRING,
                allowNull: false
            },
            bloodGroup: {
                type: DataTypes.STRING,
                allowNull: false
            },
            maritalStatus: {
                type: DataTypes.STRING,
                allowNull: false
            },
            nationality: {
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
