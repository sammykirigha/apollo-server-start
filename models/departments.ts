'use strict';
import { Model } from 'sequelize';

type DepartmentType = {
  id: string,
  department_name: string,
};

module.exports = (sequelize: any, DataTypes: { STRING: any; }) => {
  const { Sequelize } = sequelize;

  class Department extends Model<DepartmentType> implements DepartmentType {
    id: string;
    department_name: string;
    static associate(models: any) {
      // define association here
    }
  }
  Department.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    department_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
    {

      freezeTableName: true,
      timestamps: true,
      underscored: false,
      sequelize,
      tableName: "Departments",
      modelName: "Departments",
    }
  );
  return Department;
};