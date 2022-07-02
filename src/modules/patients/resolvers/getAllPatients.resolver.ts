import { UserInputError } from "apollo-server-express";
import { FieldResolver, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import db from "../../../../models";
import { isAuth } from "../../../middlewares/auth.middleware";
import { Patient } from "../schemas/patient";



export class PatientResolver {

	@Query(returns => ([Patient]))
	@UseMiddleware(isAuth)
	async getPatients(): Promise<([Patient])> {
		let patients = await db.patients.findAll()

		return patients
	}
}