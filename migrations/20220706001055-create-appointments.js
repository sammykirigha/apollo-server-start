"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("appointments", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            patient_id: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            patient_email: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            patient_phone: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            department: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            doctor_id: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            date: {
              type: Sequelize.DATE,
              allowNull: false,
            },
            time: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            comments: {
              type: Sequelize.STRING,
              allowNull: true,
            },
            status: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            fees: {
              type: Sequelize.INTEGER,
              allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("appointments");
    },
};
