"use strict";
import { Model } from "sequelize";

type DoctorAttributes = {
  id: string,
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  password: string,
  address: string,
  gender: string,
  department: string,
  image: string,
  specialization: string,
  facebooklLink: string,
  linkedinlLink: string,
  instagramlLink: string,
  twitterlLink: string,
  confirmed: boolean,
  confirmToken: string,
  passwordResetToken: string,
  passwordResetExpires: Date
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
    password: string;
    department: string;
    image: string;
    specialization: string;
    facebooklLink: string;
    linkedinlLink: string;
    instagramlLink: string;
    twitterlLink: string;
    confirmed: boolean;
    confirmToken: string;
    passwordResetToken: string;
    passwordResetExpires: Date

    static associate(models: any) {
      // define association here
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
      password: {
        type: DataTypes.STRING,
        allowNull: true
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
      modelName: "doctors",
      tableName: "doctors",
      timestamps: true,
      freezeTableName: true,
    }
  );
  return Doctor;
};
