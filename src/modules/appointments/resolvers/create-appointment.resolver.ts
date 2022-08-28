import { UserInputError } from "apollo-server-express";
import { Arg, Mutation } from "type-graphql";
import db from "../../../../models";
import sendMail from "../../../utils/sendEmail";
import { Appointment, CreateAppointmentInput } from "../schemas/appointment";

export class CreateAppointmentResolver {
	@Mutation(returns => Appointment, {
		description: "create an appointment"
	})

	async createAppointment(
		@Arg('input', type => CreateAppointmentInput, {
			description: "Create appointment input"
		})
		input: CreateAppointmentInput
	): Promise<Appointment> {

		if (!input.patientId) {
			throw new Error("Please provide patient name/id")
		}

		if (!input.doctorId) {
			throw new Error("Please provide doctor name/id")
		}

		let doctor = await db.doctors.findOne({ where: { id: input.doctorId } })

		if (!doctor) {
			throw new Error("Not doctor found...")
		}

		const transaction = await db.sequelize.transaction();

		try {
			const appointment = await db.appointments.create(input, {
				transaction
			})

			if (appointment) {

				// await sendMail({
				// 	from: {
				// 		name: "Samuel Kirigha",
				// 		address: "sammydorcis@outlook.com"
				// 	},
				// 
				// 	to: `${appointment.patient_email}`,
				// cc: `${appointment.doctor_email}`
				// 	subject: "Appointment Created",
				// 	// text: "You have created an appointment the doctors is approving your appointment",
				// 	html: `
				// 	<p>You have created a new appointment the doctors is approving your appointment</p>
				// 	<p>Your preferred date of appointment is ${appointment.date} at ${appointment.time}. 
				// 	The total charges are KSH${appointment.fees} and the Doctor to see is ${doctor.firstname} ${doctor.lastname}</p>
				// 	`
				// }
				// )

				

				transaction.commit()

				await appointment.save();

				return appointment as Appointment;

			} else {
				throw new Error("Could not create appointment")
			}
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}

}