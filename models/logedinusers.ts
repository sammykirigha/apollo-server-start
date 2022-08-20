'use strict';
import { Model } from "sequelize";
import { userRoleStatus } from "../src/common/enums/userRoles.enum";

type UserAttributes = {
  id: string,
  username: string,
  user_id: string,
  email: string,
  password: string,
  role: userRoleStatus,
  confirmed: boolean,
  confirmToken: string,
  passwordResetToken: string,
  passwordResetExpires: Date
}

module.exports = (sequelize: any, DataTypes: any) => {
  class logedInUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  logedInUsers.init({
    username: DataTypes.STRING,
    user_id: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'logedInUsers',
  });
  return logedInUsers;
};