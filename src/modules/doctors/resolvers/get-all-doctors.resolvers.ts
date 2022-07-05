import { Query , UseMiddleware } from "type-graphql";
import db from "../../../../models";
import { isAuth } from "../../../middlewares/auth.middleware";
import { Doctor } from "../schemas/doctors";


export class DoctorResolver {

	@Query(returns => ([Doctor]))
	// @UseMiddleware(isAuth)
	async getDoctors(): Promise<([Doctor])> {
		let doctors = await db.doctors.findAll()

		return doctors
	}
}