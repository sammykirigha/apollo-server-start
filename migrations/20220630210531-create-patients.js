"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("patients", {
            id: {
                primaryKey: true,
                allowNull: false,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            firstname: {
                type: Sequelize.STRING,
                required: true,
            },
            lastname: {
                type: Sequelize.STRING,
                required: true,
            },
            email: {
                type: Sequelize.STRING,
                required: true,
            },
            phone: {
                type: Sequelize.STRING,
            },
            gender: {
                type: Sequelize.STRING,
                required: true,
            },
            address: {
                type: Sequelize.STRING,
                required: true,
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
        await queryInterface.dropTable("patients");
    },
};
