import { UserInputError } from "apollo-server-express";
import { Arg, Ctx, Mutation } from "type-graphql";
import db from "../../../../models";
import bcryptjs from 'bcryptjs'
import { DeletePatientInput, Patient } from "../schemas/patient";
import { sign } from "jsonwebtoken";


export class DeleteResolver {

	@Mutation(() => String, {
		description: "delete patient mutation"
	})
	async deletePatient(
		@Arg('input', type => DeletePatientInput, {
			description: "login Patients Input"
		})
		input: DeletePatientInput,
	): Promise<string> {

		const user = await db.patients.findOne({ where: { id: input.id } })
		
		if (!user) {
			throw new Error("user input error....")
		}

		await db.patients.destroy({ where: { id: input.id } })
		
		return "User deleted successfully";
	}
}