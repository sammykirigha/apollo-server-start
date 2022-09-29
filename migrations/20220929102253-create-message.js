"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("messages", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            chatId: {
                allowNull: true,
                type: Sequelize.UUID,
            },
            sender: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            receiver: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            message: {
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

        await queryInterface.addConstraint("messages", {
            fields: ["sender"],
            type: "foreign key",
            name: "messages_sender_users_fk",
            references: {
                table: "logged_in_users",
                field: "id",
            },
            onDelete: "cascade",
            onUpdate: "cascade",
        });

        await queryInterface.addConstraint("messages", {
            fields: ["receiver"],
            type: "foreign key",
            name: "messages_receiver_users_fk",
            references: {
                table: "logged_in_users",
                field: "id",
            },
            onDelete: "cascade",
            onUpdate: "cascade",
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("messages");
    },
};
