import { UserInputError } from "apollo-server-express";
import { Op } from "sequelize";
import { Arg, Authorized, Ctx, Mutation, PubSub, PubSubEngine, Query, Resolver } from "type-graphql";
import db from "../../../../models";
import { Context } from "../../../common/interfaces/context.interface";
import { Chat, CreateMessageInput, Message } from "../schemas";

@Resolver()
export class ChatsResolver {

	@Mutation(type => Message, { description: "Create Chat Message Mutation" })
	@Authorized()
	async createMessage(
		@Arg("input", (type) => CreateMessageInput, { description: "Create Message Input" })
		input: CreateMessageInput,

		@PubSub() pubSub: PubSubEngine
	): Promise<Message> {
		const transaction = await db.sequelize.transaction();

		let chat;
		try {
			const msg_obj: any = {
				sender: input.sender,
				receiver: input.receiver,
				message: input.message,
			}

			if (input.chatId) {
				chat = await db.chats.findByPk(input.chatId);
				if (!chat) {
					throw new UserInputError(
						`Invalid chat Id`,
					);
				}
				msg_obj.chatId = input.chatId
			}

			let message = await db.messages.create(
				msg_obj,
				{ transaction },
			)

			if (message) {

				if (!input.chatId) {
					chat = await db.chats.create(
						{
							last_message_id: message.id,
							members: [message.sender, message.receiver]
						},
						{ transaction }
					)
				}

				if (chat) {
					await transaction.commit();

					message.chatId = chat.id;
					await message.save();

					chat.last_message_id = message.id;
					await chat.save();

					await pubSub.publish('NOTIFICATIONS', { message })

					return message;

				} else {
					await transaction.rollback();
					throw new Error(`Could send message`);
				}

			} else {
				await transaction.rollback();
				throw new Error(`Could send message`);
			}
		} catch (error: any) {
			console.log(error.message);
			await transaction.rollback();
			throw new Error("Could send message");

		}
	}

	@Query(type => [Message])
	@Authorized()
	async fetchMessages(
		@Arg('chatId', type => String)
		chatId: string
	): Promise<Message[]> {
		const messages = await db.messages.findAll()
		return messages
	}

	@Query(type => [Chat])
	@Authorized()
	async fetchChats(
		@Ctx() ctx: Context,
	): Promise<Chat[]> {
		const chats = await db.chats.findAll({
			where: {
				members: {
					[Op.or]: {
						[Op.contains]: [ctx.user.id]
					}
				}
			},
			include: [
				{ model: db.messages, as: "last", limit: 1 },
			]
		})
		console.log(chats);
		
		return chats
	}
}