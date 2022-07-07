import { Query  } from "type-graphql";
import db from "../../../../models";
import { Appointment } from "../schemas/appointment";
export class PatientResolver {

	@Query(returns => ([Appointment]))
	async getAppointments(): Promise<([Appointment])> {
		let appointments = await db.appointments.findAll()

		return appointments as [Appointment]
	}
}