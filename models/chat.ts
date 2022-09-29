"use strict";

import { Model } from 'sequelize';


type ChatAttributes = {
	id: string,
	members: string[],
	last_message_id: string,
};

module.exports =(sequelize: any, DataTypes: any) => {

	const { Sequelize } = sequelize;
	class Chat extends Model<ChatAttributes> implements ChatAttributes {
		id: string;
		members: string[];
		last_message_id: string;
		static associate(models: any) {
			// define association here
			Chat.belongsToMany(models.logged_in_users, { through: 'members' })
			Chat.hasMany(models.messages, { as: "last" })
		}
	}

	Chat.init(
		{
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			members: {
				type: Sequelize.ARRAY(Sequelize.UUID),
				allowNull: false,
				references: {
					model: "logged_in_users",
					key: "id"
				}
			},

			last_message_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: "messages",
					key: "id"
				}
			},

		},

		{

			freezeTableName: true,
			timestamps: true,
			underscored: false,
			sequelize,
			tableName: "chats",
			modelName: "chats",
		}

	);

	return Chat;

};