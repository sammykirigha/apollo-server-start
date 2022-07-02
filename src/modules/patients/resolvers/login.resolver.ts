import { UserInputError } from "apollo-server-express";
import { Arg, Ctx, Mutation } from "type-graphql";
import db from "../../../../models";
import bcryptjs from 'bcryptjs'
import { LoginPatientInput, Patient } from "../schemas/patient";
import { sign } from "jsonwebtoken";


export class LoginResolver {

	@Mutation(returns => Patient, {
		description: "login patient mutation"
	})
	async loginPatient(
		@Arg('input', type => LoginPatientInput, {
			description: "login Patients Input"
		})
		input: LoginPatientInput,
	): Promise<Patient | null> {

		let patient = await db.patients.findOne({ where: { email: input.email } })
		
		if (!patient) {
			throw new UserInputError(
				"Invalid credentials"
			)
		}

		const isValid = await bcryptjs.compare(input.password, patient.password)

		if (!isValid) {
			throw new UserInputError(
				"Invalid credentials"
			)
		} const newToken = sign({
			id: patient.id,
			status: patient.status,
		}, 'sammykightgfhgcvbnb', { expiresIn: '24h' })

		patient.token = newToken;
		
		// if (!patient.confirmed) {
		// 	return null
		// }

		return patient;
	}
}