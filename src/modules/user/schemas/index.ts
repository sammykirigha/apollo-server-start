import { IsNotEmpty } from "class-validator";
import { EnumDataType } from "sequelize/types";
import { Field, InputType, ObjectType } from "type-graphql";


@ObjectType()
export class User {
	@Field({ description: "ID of a saved user" })
	id: string;

	@Field({ description: "Username of a user" })
	firstname: string

	@Field({ description: "The Name os a user" })
	lastname: string;

	@Field({ description: 'Email of a user' })
	email: string;

	@Field({ description: 'phone of a user' })
	phone: string;
}

@InputType()
export class CreateUserInput {

	@Field({
		nullable: false,
		description: "Username of a user"
	})
	@IsNotEmpty()
	firstname: string

	@Field({
		nullable: false,
		description: "Username of a user"
	})
	@IsNotEmpty()
	lastname: string;

	@Field({
		nullable: false,
		description: "email of a user"
	})
	@IsNotEmpty()
	email: string;

	@Field({
		nullable: true,
		description: "phone of a user"
	})
	phone: string;
}