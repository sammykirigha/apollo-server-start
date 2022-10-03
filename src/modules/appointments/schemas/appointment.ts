import { IsDate, IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { AppointmentStatus } from "../../../common/enums/appointment.enum";


@ObjectType()
export class Appointment {
	@Field({ description: "ID of the appointment" })
	id: string;

	@Field({ description: "name of the patient" })
	patientId: string;

	@Field({ description: "email of the patient" })
	patient_email: string;

	@Field({ description: "phone of the patient" })
	patient_phone: string;

	@Field({ description: "age of the patient" })
	age: number;

	@Field({ description: "department" })
	department: string;

	@Field({ description: "doctors name" })
	doctorId: string;

	@Field({ description: "date of the appointment" })
	date: Date;

	@Field({ description: "time of the appointment" })
	time: string;

	@Field({ description: " patient_firstname" })
	patient_firstname: string;

	@Field({ description: " patient_firstname" })
	patient_lastname: string;

	@Field({ description: "charge for the appointment" })
	fees: string;

	@Field({ description: "status of the appointment" })
	status: string;

	@Field({ description: "status of the appointment" })
	description: string;
}

@InputType()
export class CreateAppointmentInput {

	@Field({
		nullable: false,
		description: "Username of a user"
	})
	@IsNotEmpty()
	patientId: string;

	@Field({
		nullable: false,
		description: "email of a user"
	})
	@IsNotEmpty()
	@IsEmail()
	patient_email: string;

	@Field({
		nullable: false,
		description: "phone of a user"
	})
	patient_phone: string;

	@Field({
		nullable: false,
		description: "phone of a user"
	})
	age: number;

	@Field({
		nullable: false,
		description: "address of a user"
	})
	fees: string;

	@Field({
		nullable: false,
		description: "department of a user"
	})
	department: string;

	@Field({
		nullable: true,
		description: "date of appointment"
	})
	date: string;

	@Field(
		{
			nullable: true,
			description: "time of a user"
		}
	)
	time: string;

	@Field(
		{
			nullable: true,
			description: "time of a user"
		}
	)
	patient_firstname: string;

	@Field(
		{
			nullable: true,
			description: "time of a user"
		}
	)
	patient_lastname: string;

	@Field({
		nullable: true,
		description: "image of the user"
	})
	description: string;

	@Field((type) => AppointmentStatus, {
		nullable: true,
		description: "status of a user's appointment"
	})
	status: AppointmentStatus;

	@Field({
		nullable: true,
		description: "password treating the user"
	})
	doctorId: string;
}

@InputType()
export class UpdateAppointmentInput {

	@Field({
		nullable: false,
		description: "phone of a user"
	})
	id: string;

	@Field({
		nullable: false,
		description: "Username of a user"
	})
	@IsNotEmpty()
	patient_id: string;

	@Field({
		nullable: false,
		description: "email of a user"
	})
	@IsNotEmpty()
	@IsEmail()
	patient_email: string;

	@Field({
		nullable: false,
		description: "phone of a user"
	})
	patient_phone: string;

	@Field({
		nullable: false,
		description: "address of a user"
	})
	fees: string;

	@Field({
		nullable: false,
		description: "age of a user"
	})
	age: number;

	@Field({
		nullable: false,
		description: "department of a user"
	})
	department: string;

	@Field({
		nullable: true,
		description: "date of appointment"
	})
	date: string;

	@Field(
		{
			nullable: true,
			description: "time of a user"
		}
	)
	time: string;

	@Field(
		{
			nullable: true,
			description: "time of a user"
		}
	)
	comments: string;

	@Field({
		nullable: true,
		description: "password treating the user"
	})
	doctor_id: string;
}

@InputType()
export class HandleSingleAppointmentInput {

	@Field({
		nullable: false,
		description: "phone of a user"
	})
	id: string;
}
