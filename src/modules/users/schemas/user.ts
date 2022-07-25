import { IsEmail, IsNotEmpty } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { userRoleStatus } from "../../../common/enums/userRoles.enum";

@ObjectType()
export class User {
	@Field({ description: "ID of the user" })
	id: string;

	@Field({ description: "username of the user" })
	username: string;

	@Field({ description: "email of the user" })
	email: string;

	@Field({ description: "password of the user" })
	password: string;

	@Field({ description: "users role" })
	role: string;

	@Field({ nullable: true, description: "doctor treating the patient" })
	token: string;

	@Field({ nullable: true, description: "doctor treating the patient" })
	confirmed: boolean;

	@Field({ nullable: true, description: "doctor treating the patient" })
	confirmToken: string;

	@Field({ nullable: true, description: "doctor treating the patient" })
	passwordResetToken: string;

	@Field({ nullable: true, description: "doctor treating the patient" })
	passwordResetExpires: Date;

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
		description: "email of a user"
	})
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@Field((type) => userRoleStatus, {
		nullable: true,
		description: "status of a user's appointment"
	})
	role: userRoleStatus;

	@Field({
		nullable: true,
		description: "password of a user"
	})
	password: string;

}

@InputType()
export class ConfirmEmailInput {
	@Field({ description: "confirm user email" })
	token: string;
}

@InputType()
export class LoginUserInput {

	@Field({
		nullable: false,
		description: "email of a user"
	})
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@Field({
		nullable: true,
		description: "password of the user"
	})
	password: string;
}

@InputType()
export class ForgotPasswordInput {
	@Field({ description: "email of the user" })
	email: string;
}

@InputType()
export class PasswordResetInput {
	@Field({ description: 'token of a user' })
	token: string

	@Field({ description: 'password of a user' })
	password: string
}

