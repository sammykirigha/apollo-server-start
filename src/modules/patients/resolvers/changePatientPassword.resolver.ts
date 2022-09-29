import { UserInputError } from "apollo-server-express";
import { Arg, Mutation, Resolver } from "type-graphql";
import db from "../../../../models";
import bcryptjs from 'bcryptjs'
import { ChangePatientPasswordInput } from "../schemas/patient";

@Resolver()
export class ChangePatientPasswordResolver {
	@Mutation(returns => String, {
		description: "change users password"
	})
	async changePatientPassword(
		@Arg('input', type => ChangePatientPasswordInput, {
			description: "change password Patients Input"
		})
		input: ChangePatientPasswordInput
	): Promise<string> {

		let patient = await db.patients.findOne({ where: { id: input.id } })	
		if (!patient) {
			throw new UserInputError("No doctor found!")
		}

		let thisUser = await db.logged_in_users.findOne({ where: { email: patient.email } })
		if (!thisUser) {
			throw new UserInputError("No user found!")
		}

		const isValid = await bcryptjs.compare(input.password, thisUser.password);
		if (!isValid) {
			throw new UserInputError("Wrong password!...")
		}

		const salt = await bcryptjs.genSaltSync(10)
		const newHashedPassword = await bcryptjs.hashSync(input.newPassword, salt);

		thisUser.password = newHashedPassword;

		await thisUser.save()

		return "You have successfully changed your password"

	}
}