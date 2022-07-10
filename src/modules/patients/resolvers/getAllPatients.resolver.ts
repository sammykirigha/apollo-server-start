import { Query } from "type-graphql";
import db from "../../../../models";
import { Patient } from "../schemas/patient";
export class PatientResolver {
	@Query(returns => ([Patient]))
	async getPatients(): Promise<([Patient])> {

		let patients = await db.patients.findAll({
			include: [{
				model: db.appointments,
			}]
		})

		const getAppointments = async () => {
			const data = await Promise.all(patients.map(async (p: any) => {
				const found = await db.appointments.findOne({ where: { patientId: p.id } })
				return found.dataValues
				
			}))
			return data
		}

		const appointments = await getAppointments()
		
		patients.map((patient: any) => {
			return {...patient, appointments: appointments}
		})

		return patients
	}
}