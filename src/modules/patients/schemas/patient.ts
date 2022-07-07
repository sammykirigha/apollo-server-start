import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { PatientStatus } from "../../../common/enums/appointment.enum";

@ObjectType()
export class Patient {
	@Field({ description: "ID of the patient" })
	id: string;

	@Field({ description: "firstname of the patient" })
	firstname: string;

	@Field({ description: "lastname of the patient" })
	lastname: string;

	@Field({ description: "email of the patient" })
	email: string;

	@Field({ description: "phone of the patient" })
	phone: string;

	@Field({ description: "gender of the patient" })
	gender: string;

	@Field({ description: "address of the patient" })
	address: string;

	@Field({ description: "confirmed email of the patient's appointmnet" })
	confirmed: string;

	@Field({nullable: true, description: "doctor treating the patient" })
	token: string;
}

@InputType()
export class CreatePatientInput {

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
	@IsEmail()
	email: string;

	@Field({
		nullable: true,
		description: "phone of a user"
	})
	phone: string;

	@Field({
		nullable: true,
		description: "gender of a user"
	})
	gender: string;

	@Field({
		nullable: true,
		description: "address of a user"
	})
	address: string;

	@Field({
		nullable: true,
		description: "password of the user"
	})
	@MinLength(8)
	password: string;
}

@InputType()
export class LoginPatientInput {

	@Field({
		nullable: false,
		description: "email of a user"
	})
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@Field({
		nullable: true,
		description: "token of the user"
	})
	token: string;

	@Field({
		nullable: true,
		description: "password of the user"
	})
	password: string;
}

@InputType()
export class DeletePatientInput {

	@Field({description: "id of a user"})
	id: string;
	
}

@InputType()
export class ForgotPasswordInput{
	@Field({ description: "email of the patient" })
	email: string;
}

@InputType()
export class ConfirmEmailInput{
	@Field({ description: "confirm user email" })
	token: string;
}

@InputType()
export class PasswordResetInput{
	@Field({ description: 'token of a patient' })
	token: string

	@Field({ description: 'password of a patient' })
	password: string
}

