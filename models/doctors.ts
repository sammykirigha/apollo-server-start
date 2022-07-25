"use strict";
import { Model } from "sequelize";

type DoctorAttributes = {
  id: string,
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  address: string,
  gender: string,
  department: string,
  image: string,
  specialization: string,
  experience: string,
  facebooklLink: string,
  linkedinlLink: string,
  instagramlLink: string,
  twitterlLink: string,
}

module.exports = (sequelize: any, DataTypes: any) => {
  const { Sequelize } = sequelize;

  class Doctor extends Model<DoctorAttributes> implements DoctorAttributes {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    gender: string;
    department: string;
    image: string;
    specialization: string;
    experience: string;
    facebooklLink: string;
    linkedinlLink: string;
    instagramlLink: string;
    twitterlLink: string;

    static associate(models: any) {
      // define association here
      Doctor.hasMany(models.appointments, {
        foreignKey: "doctorId",
      });

    }
  }
  Doctor.init(
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
        allowNull: true
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true
      },
      specialization: {
        type: DataTypes.STRING,
        allowNull: true
      },
      experience: {
        type: DataTypes.STRING,
        allowNull: true
      },
      facebooklLink: {
        type: DataTypes.STRING,
        allowNull: true
      },
      linkedinlLink: {
        type: DataTypes.STRING,
        allowNull: true
      },
      instagramlLink: {
        type: DataTypes.STRING,
        allowNull: true
      },
      twitterlLink: {
        type: DataTypes.STRING,
        allowNull: true
      },
      department: {
        type: DataTypes.STRING,
        allowNull: true
      },
    },
    {
      sequelize,
      modelName: "doctors",
      tableName: "doctors",
      timestamps: true,
      freezeTableName: true,
    }
  );
  return Doctor;
};
