"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("appointments", {
            id: {
                primaryKey: true,
                allowNull: false,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            patientId: {
                type: Sequelize.UUID,
                references: {model: 'patients', key: 'id'},
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
            doctorId: {
                 type: Sequelize.UUID,
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
                type: Sequelize.STRING,
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
