import { UserInputError } from "apollo-server-express";
import { Arg, Mutation, Resolver } from "type-graphql";
import db from "../../../../models";
import bcryptjs from 'bcryptjs'
import { Op } from "sequelize";
import { ChangePasswordInput } from "../schemas/doctors";

@Resolver()
export class ChangeDoctorsPasswordResolver {
	@Mutation(returns => String, {
		description: "change users password"
	})
	async changeDoctorsPassword(
		@Arg('input', type => ChangePasswordInput, {
			description: "change password Patients Input"
		})
		input: ChangePasswordInput
	): Promise<string> {

		let doctor = await db.doctors.findOne({ where: { id: input.id } })	
		if (!doctor) {
			throw new UserInputError("No doctor found!")
		}

		let thisUser = await db.logged_in_users.findOne({ where: { email: doctor.email } })
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