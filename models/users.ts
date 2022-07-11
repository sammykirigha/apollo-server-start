'use strict';
import { Model } from "sequelize";
import { userRoleStatus } from "../src/common/enums/userRoles.enum";

type UserAttributes = {
  id: string,
  username: string,
  email: string,
  password: string,
  role: userRoleStatus,
  confirmed: boolean,
  confirmToken: string,
  passwordResetToken: string,
  passwordResetExpires: Date
}
module.exports = (sequelize: any, DataTypes: any) => {
  const { Sequelize } = sequelize;
  class User extends Model<UserAttributes> implements UserAttributes {

    id: string;
    email: string;
    username: string;
    role: userRoleStatus;
    password: string
    confirmed: boolean;
    confirmToken: string;
    passwordResetToken: string;
    passwordResetExpires: Date

    static associate(models: any) {
      // define association here
    }
  }
  User.init({
    id: {
      primaryKey: true,
      allowNull: false,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
     role: {
        type: Sequelize.ENUM("user", "admin", "patient", "doctor"),
        defaultValue: "user",
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
    confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    confirmToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passwordResetExpires: {
      type: DataTypes.DATE,
      allowNull: true,
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