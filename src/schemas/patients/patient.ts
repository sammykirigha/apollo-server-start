import { IsNotEmpty, isNotEmpty } from "class-validator";
import { EnumDataType } from "sequelize/types";
import { Field, InputType, ObjectType } from "type-graphql";

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

	@Field({ description: "department of the patient" })
	department: string;

	@Field({ description: "date of the patient' appointment" })
	date: string;

	@Field({ description: "time of the patient's appointmnet" })
	time: string;

	@Field({ description: "status of the patient's appointmnet" })
	status: string;

	@Field({ description: "doctor treating the patient" })
	doctor: string;
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
		description: "department of a user"
	})
	department: string;

	@Field({
		nullable: true,
		description: "date of appointment"
	})
	date: string;

	@Field({
		nullable: true,
		description: "time of a user"
	})
	time: string;

	@Field({
		nullable: true,
		description: "status of a user's appointment"
	})
	status: string;

	@Field({
		nullable: true,
		description: "doctor treating the user"
	})
	doctor: string;
}
