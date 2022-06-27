import { IsNotEmpty } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";


@ObjectType()
export class User {
	@Field({ description: "ID of a saved user" })
	id: string;

	@Field({ description: "Username of a user" })
	username: string

	@Field({ description: "The Name os a user" })
	name: string;
}

@InputType()
export class CreateUserInput {

	@Field({
		nullable: false,
		description: "Username of a user"
	})
	@IsNotEmpty()
	username: string

	@Field({
		nullable: false,
		description: "Username of a user"
	})
	@IsNotEmpty()
	name: string;
}