import { IsNotEmpty } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { User } from "../../users/schemas/user";


@ObjectType()
export class Message {
	@Field()
	id: string;

	@Field({ nullable: true })
	sender: string

	@Field()
	receiver: string

	@Field()
	message: string

	@Field()
	chatId: string

	@Field(type => User, { nullable: true })
	sender_?: User

	@Field(type => User, { nullable: true })
	receiver_?: User

	@Field({ nullable: true })
	createdAt: Date;

	@Field({ nullable: true })
	updatedAt: Date;
}

@ObjectType()
export class Chat {
	@Field()
	id: string;

	@Field(type => [String])
	members: [string]

	@Field()
	last_message_id: string

	@Field(type => [Message], { nullable: true })
	last: [Message]
}

@InputType({
	description:
		'Create Message Input',
})
export class CreateMessageInput {

	@Field()
	@IsNotEmpty()
	sender: string

	@Field()
	@IsNotEmpty()
	receiver: string

	@Field()
	@IsNotEmpty()
	message: string

	@Field({
		nullable: true
	})
	chatId?: string
}