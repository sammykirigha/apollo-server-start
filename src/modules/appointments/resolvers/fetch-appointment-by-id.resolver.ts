import { Arg, Query } from "type-graphql";
import db from "../../../../models";
import { Appointment, HandleSingleAppointmentInput } from "../schemas/appointment";

export class GetSingleAppointmentById {
	@Query((returns) => Appointment)
	async fetchSingleAppointment(
		@Arg('input', type => HandleSingleAppointmentInput, {
			description: "fetch one appointment"
		})
		input: HandleSingleAppointmentInput
	): Promise<Appointment>{
		
		let appointment = await db.appointments.findOne({ where: { id: input.id } })
		
		if (!appointment) {
			throw new Error("No appointment like that found")
		}

		return appointment as Appointment
	}
}