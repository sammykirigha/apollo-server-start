"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("logginedInUsers", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            email: {
                type: Sequelize.STRING,
                required: true,
            },
            username: {
                type: Sequelize.STRING,
                required: true,
            },
            password: {
                type: Sequelize.STRING,
                required: true,
            },
            role: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            confirmed: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
            },
            confirmToken: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            passwordResetToken: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            passwordResetExpires: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            token: {
                type: Sequelize.STRING,
                allowNull: true,
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
        await queryInterface.dropTable("logginedInUsers");
    },
};
