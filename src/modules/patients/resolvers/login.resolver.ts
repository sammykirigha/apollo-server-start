import { UserInputError } from "apollo-server-express";
import { Arg, Mutation } from "type-graphql";
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
		input: LoginPatientInput
	): Promise<Patient | null> {

		let user = await db.patients.findOne({ where: { email: input.email } })
		
		if (!user) {
			throw new UserInputError(
				"Invalid credentials"
			)
		}

		const isValid = await bcryptjs.compare(input.password, user.password)

		if (!isValid) {
			throw new UserInputError(
				"Invalid credentials"
			)
		} const newToken = sign({
			id: user.id,
			status: user.status,
		}, 'sammykightgfhgcvbnb', { expiresIn: '24h' })

		user.token = newToken;
		return user;
	}
}