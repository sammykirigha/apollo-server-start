import { Op } from "sequelize";
import { Arg, Query } from "type-graphql";
import db from "../../../../models";
import { buildDbFilter } from "../../../common/filters/BuilderFilter";
import { Appointment, GetAppointmentByDateInput } from "../schemas/appointment";
import { AppointmentFilter } from "../schemas/filters";
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
		@Arg('filters', type => AppointmentFilter, {
			description: "fetch one appointment",
			nullable: true
		})
		filters: AppointmentFilter,
	): Promise<([Appointment])> {

		let where = {}

		if (filters) {
			where = buildDbFilter(filters)
		}
		
		let appointments = await db.appointments.findAll({
			where,
			include: [
				db.patients,
				db.doctors
			]
		})

		return appointments;
	}
}