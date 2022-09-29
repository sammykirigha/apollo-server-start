"use strict";


module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("chats", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            members: {
                allowNull: true,
                type:Sequelize.ARRAY(Sequelize.UUID),
            },
            last_message_id: {
                type: Sequelize.UUID,
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

        await queryInterface.addConstraint("chats", {
            fields: ["last_message_id"],
            type: "foreign key",
            name: "chat_last_message_id_fk",
            references: {
                table: "messages",
                field: "id",
            },
            onDelete: "cascade",
            onUpdate: "cascade"

        })
    },


    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("chats");
    },
};
