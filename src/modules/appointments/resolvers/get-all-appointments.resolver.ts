import { Op } from "sequelize";
import { Arg, Query, Resolver } from "type-graphql";
import db from "../../../../models";
import { buildDbFilter } from "../../../common/filters/BuilderFilter";
import { SortDirection } from "../../../common/schema/paganation.schema";
import { Appointment } from "../schemas/appointment";
import { AppointmentSortColumn } from "../schemas/enums";
import { AppointmentFilter, AppointmentPaginationInput, AppointmentPaginationOutput } from "../schemas/filters";

@Resolver()
export class AppointmentsResolver {

	@Query(returns => ([Appointment]))
	async getAppointments(
		// @Arg('pagination', (type) => AppointmentPaginationInput, {
		// 	description: 'appointment pagination',
		// 	nullable: true
		// })
		// pagination: AppointmentPaginationInput
	): Promise<([Appointment])> {
		// let page: number = pagination?.page || -1;
		// page = page >= 1 ? page - 1 : page;

		// let column: AppointmentSortColumn = pagination?.column || AppointmentSortColumn.ID;
		// let pageSize: number = pagination?.count || -1;

		// //get sort column
		// let sortColumn: string = 'id';
		// switch (column) {
		// 	case AppointmentSortColumn.ID:
		// 		sortColumn = 'id';
		// 		break;
			
		// }

		// //filtering and sorting options
		// const limit = pageSize <= 0 ? null : pageSize;
		// const offset = page <= 0 ? 0 : page * (pageSize <= 0 ? 0 : pageSize);
		// const order = [
		// 	[sortColumn, pagination?.sortDirection || SortDirection.ASC],
		// ];
		let appointments = await db.appointments.findAll({
			include: [
				db.patients,
				db.doctors
			],
			// limit,
			// order,
			// offset,
			// subQuery: false
			
		})

		// const totalCount: number = (await db.appointments.findAll()).length;

		// const result: AppointmentPaginationOutput = {
		// 	count: appointments.length,
		// 	nodes: appointments,
		// 	pageCount: totalCount === 0 || pageSize <= 0 ? 1 : Math.ceil(totalCount / pageSize),
		// 	totalCount,
		// };

		return appointments;
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