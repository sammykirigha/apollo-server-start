'use strict';
import { Model } from "sequelize";

type AppointmentAttributes = {
  id: string,
  patientId: string,
  patient_email: string,
  patient_phone: string,
  department: string,
  doctorId: string,
  date: Date,
  time: string,
  comments: string,
  description: string,
  status: "pending" | "complete" | "approved" | "rejected",
  fees: string,

}

module.exports = (sequelize: any, DataTypes: any) => {
  const { Sequelize } = sequelize;
  class Appointment extends Model<AppointmentAttributes> implements AppointmentAttributes {

    id: string;
    patientId: string;
    patient_email: string;
    patient_phone: string;
    department: string;
    doctorId: string;
    date: Date;
    time: string;
    comments: string;
    description: string;
    status: "pending" | "complete" | "approved" | "rejected";
    fees: string;

    static associate(models: any) {
      // define association here
      Appointment.belongsTo(models.patients);
      Appointment.belongsTo(models.doctors);
    }
  }
  Appointment.init(
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      patientId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {model: 'patients', key: 'id'},
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
      doctorId: {
        type: Sequelize.UUID,
        references: {model: 'doctors', key: 'id'},
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
        description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM("pending", "complete", "approved"),
        defaultValue: "pending",
        allowNull: false
      },
      fees: {
        type:  DataTypes.STRING,
        allowNull: false
      },
    },

    {
      sequelize,
      modelName: 'appointments',
    });
  return Appointment;
};