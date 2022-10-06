import { Op } from "sequelize";
import { Arg, Query  } from "type-graphql";
import db from "../../../../models";
import { Appointment, GetAppointmentByDateInput } from "../schemas/appointment";
export class PatientResolver {

	@Query(returns => ([Appointment]))
	async getAppointments(): Promise<([Appointment])> {
		let appointments = await db.appointments.findAll({
			include: [
				db.patients,
				db.doctors
			]
		})

		return appointments as [Appointment]
	}

	@Query(returns => ([Appointment]))
	async getAppointmentsByDate(
		@Arg('input', type => GetAppointmentByDateInput, {
			description: "fetch one appointment"
		})
		input: GetAppointmentByDateInput
	): Promise<([Appointment])>{
		let appointments = await db.appointments.findAll({
			where: {
				patientId: input.patientID,
				date: {
					[Op.gt]: new Date(),
					[Op.lt]:  new Date(new Date().getTime() + (86400000 *5 )  )
			  }
			}
		})

		return appointments;
	}
}