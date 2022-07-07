import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { AppointmentStatus } from "../../../common/enums/appointment.enum";


@ObjectType()
export class Appointment {
	@Field({ description: "ID of the appointment" })
	id: string;

	@Field({ description: "name of the patient" })
	patient_id: string;

	@Field({ description: "email of the patient" })
	patient_email: string;

	@Field({ description: "phone of the patient" })
	patient_phone: string;

	@Field({ description: "department" })
	department: string;

	@Field({ description: "doctors name" })
	doctor_id: string;

	@Field({ description: "date of the appointment" })
	date: Date;

	@Field({ description: "time of the appointment" })
	time: string;

	@Field({ description: "comments" })
	comments: string;

	@Field({ description: "charge for the appointment" })
	fees: string;

	@Field({ description: "status of the appointment" })
	status: string;
}

@InputType()
export class CreateAppointmentInput {

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

	@Field((type) => AppointmentStatus, {
		nullable: true,
		description: "status of a user's appointment"
	})
	status: AppointmentStatus;

	@Field({
		nullable: true,
		description: "password treating the user"
	})
	doctor_id: string;
}
