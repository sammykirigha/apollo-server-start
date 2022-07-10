import { Query } from "type-graphql";
import db from "../../../../models";
import { Patient } from "../schemas/patient";
export class PatientResolver {
	@Query(returns => ([Patient]))
	async getPatients(): Promise<([Patient])> {
		let patients = await db.patients.findAll({
			include: db.appointments
		})

		// let appointment = await db.appointments.findOne({where: {patientId: ""}})

		return patients
	}
}