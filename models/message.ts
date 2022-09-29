"use strict";

import { Model } from 'sequelize';

type MessageAttributes = {
    id: string,
    sender: string,
    receiver: string,
    message: string,
    chatId: string,
};

module.exports = (sequelize: any, DataTypes: any) => {
    const { Sequelize } = sequelize;

    class Message extends Model<MessageAttributes> implements MessageAttributes {
        id: string;
        sender: string;
        receiver: string;
        message: string;
        chatId: string;

        static associate(models: any) {
            // define association here
            Message.belongsTo(models.logged_in_users, { foreignKey: "receiver", as: "receiver_" });
            Message.belongsTo(models.logged_in_users, { foreignKey: "sender", as: "sender_" });
            Message.belongsTo(models.chats, { foreignKey: "chatId" });
        }
    }

    Message.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
        },
        sender: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: "logged_in_users",
                key: "id"
            }
        },
        receiver: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: "logged_in_users",
                key: "id"
            }
        },
        message: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        chatId: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    },
        {
            freezeTableName: true,
            timestamps: true,
            underscored: false,
            sequelize,
            tableName: "messages",
            modelName: "messages",
        }
    );
    return Message;
};