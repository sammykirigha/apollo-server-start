'use strict';
import { Model } from "sequelize";

type AppointmentAttributes = {
  id: string,
  patient_id: string,
  patient_email: string,
  patient_phone: string,
  department: string,
  doctor_id: string,
  date: Date,
  time: string,
  comments: string,
  status: "pending" | "complete" | "approved",
  fees: number,

}

module.exports = (sequelize: any, DataTypes: any) => {
  const { Sequelize } = sequelize;
  class Appointments extends Model {

    id: string;
    patient_id: string;
    patient_email: string;
    patient_phone: string;
    department: string;
    doctor_id: string;
    date: Date;
    time: string;
    comments: string;
    status: "pending" | "complete" | "approved";
    fees: number;

    static associate(models: any) {
      // define association here
    }
  }
  Appointments.init(
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      patient_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      patient_email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      patient_phone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      department: {
        type: DataTypes.STRING,
        allowNull: false
      },
      doctor_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false
      },
      comments: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM("pending", "complete", "approved"),
        defaultValue: "pending",
        allowNull: false
      },
      fees: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    },

    {
      sequelize,
      modelName: 'appointments',
    });
  return Appointments;
};