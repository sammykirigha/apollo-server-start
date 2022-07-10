import { Query , UseMiddleware } from "type-graphql";
import db from "../../../../models";
import { isAuth } from "../../../middlewares/auth.middleware";
import { Doctor } from "../schemas/doctors";


export class DoctorResolver {

	@Query(returns => ([Doctor]))
	// @UseMiddleware(isAuth)
	async getDoctors(): Promise<([Doctor])> {
		let doctors = await db.doctors.findAll({
			include: [{
				model: db.appointments,
			}]
		})

		const getAppointments = async () => {
			const data = await Promise.all(doctors.map(async (doc: any) => {
				const found = await db.appointments.findOne({ where: { doctorId: doc.id } })
				return found.dataValues
				
			}))
			return data
		}

		const appointments = await getAppointments()
		
		doctors.map((doc: any) => {
			return {...doc, appointments: appointments}
		})

		return doctors
	}
}