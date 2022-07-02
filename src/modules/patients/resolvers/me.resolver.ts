
import { Ctx, Query } from "type-graphql";
import db from "../../../../models";
import { Patient } from "../schemas/patient";
import { sign } from "jsonwebtoken";
import { Context } from "../../../common/interfaces/context.interface";


export class MeResolver {
	@Query(returns => Patient, {
		description: "get the current user"
	})
	async currentPatient(
		@Ctx() ctx: Context): Promise<Patient | null> {

		let patientId = ctx.user.id

		if (!patientId) {
			return null
		}

		let patient = await db.patients.findByPk(patientId)

		const newToken = sign(
			{
				id: patient.id,
				status: patient.status,
				email: patient.email
			},
			'sammykightgfhgcvbnb',
			{ expiresIn: '24h' }
		)

		patient.token = newToken;
		return patient;
	}
}