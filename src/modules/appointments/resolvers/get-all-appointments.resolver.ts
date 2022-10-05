import { Op } from "sequelize";
import { Query  } from "type-graphql";
import db from "../../../../models";
import { Appointment } from "../schemas/appointment";
export class PatientResolver {

	@Query(returns => ([Appointment]))
	async getAppointments(): Promise<([Appointment])> {
		let appointments = await db.appointments.findAll()

		return appointments as [Appointment]
	}

	@Query(returns => ([Appointment]))
	async getAppointmentsByDate(): Promise<([Appointment])>{
		let appointments = await db.appointments.findAll({
			where: {
				date: {
					[Op.gt]: new Date(),
					[Op.lt]:  new Date(new Date().getTime() + (86400000 * 5)  )
			  }
			}
		})

		return appointments;
	}
}