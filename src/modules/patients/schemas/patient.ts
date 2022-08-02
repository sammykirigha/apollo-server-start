import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { Appointment } from "../../appointments/schemas/appointment";

@ObjectType()
export class Patient {
	static findAll(arg0: { include: { model: typeof import("../../appointments/schemas/appointment").Appointment; required: boolean; }[]; }) {
		throw new Error("Method not implemented.");
	}
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

	@Field({ nullable: true, description: "doctor treating the patient" })
	token: string;

	@Field({ nullable: true, description: "doctor treating the patient" })
	image: string;

	@Field({ nullable: true, description: "doctor treating the patient" })
	dateOfBirth: Date;

	@Field({ nullable: true, description: "doctor treating the patient" })
	disability: boolean;

	@Field({ nullable: true, description: "doctor treating the patient" })
	county: string;

	@Field({ nullable: true, description: "doctor treating the patient" })
	bloodGroup: string;

	@Field({ nullable: true, description: "doctor treating the patient" })
	nationality: string;

	@Field({ nullable: true, description: "doctor treating the patient" })
	maritalStatus: string;

	@Field((_returns) => [Appointment],{
		nullable: true,
		description: "appointments of the patients"
	})
	appointments!: [Appointment]

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
		description: "image of the user"
	})
	image: string;

	@Field({
		nullable: true,
		description: "image of the user"
	})
	dateOfBirth: Date;

	@Field({
		nullable: false,
		description: "image of the user"
	})
	disability: boolean;

	@Field({
		nullable: true,
		description: "image of the user"
	})
	county: string;

	@Field({
		nullable: true,
		description: "image of the user"
	})
	bloodGroup: string;

	@Field({
		nullable: true,
		description: "image of the user"
	})
	nationality: string;

	@Field({
		nullable: true,
		description: "image of the user"
	})
	maritalStatus: string;
	
}


@InputType()
export class DeletePatientInput {

	@Field({ description: "id of a user" })
	id: string;

}


@InputType()
export class UpdatePatientInput {

	@Field({
		nullable: false,
		description: "Username of a user"
	})
	@IsNotEmpty()
	id: string

	@Field({
		nullable: false,
		description: "Username of a user"
	})
	firstname: string

	@Field({
		nullable: false,
		description: "Username of a user"
	})
	lastname: string;

	@Field({
		nullable: false,
		description: "email of a user"
	})
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

	@Field({
		nullable: true,
		description: "image of the user"
	})
	image: string;

	@Field({
		nullable: true,
		description: "image of the user"
	})
	description: string;
}


@InputType()
export class HandleSinglePatientInput {

	@Field({
		nullable: false,
		description: "phone of a user"
	})
	id: string;
}


