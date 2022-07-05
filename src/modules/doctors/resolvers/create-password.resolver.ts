import { UserInputError } from "apollo-server-express";
import { Arg, Mutation, Resolver } from "type-graphql";
import db from "../../../../models";
import bcryptjs from 'bcryptjs'
import { Op } from "sequelize";
import crypto from 'crypto';
import { CreatePasswordInput } from "../schemas/doctors";

@Resolver()
export class ResetPasswordResolver {
	@Mutation(returns => String, {
		description: "reset doctors password"
	})
	async createPassword(
		@Arg('input', type => CreatePasswordInput, {
			description: "Create doctors Input"
		})
		{ token, password }: CreatePasswordInput
	): Promise<string> {


		const hashedResetToken = crypto
			.createHash("sha256")
			.update(token)
			.digest("hex");
		

		let doctor = await db.doctors.findOne({
			where:
			{
				confirmToken: hashedResetToken
			}
		})

		if (!doctor) {
			throw new UserInputError(
				"User not found...."
			)
		}

		const salt = await bcryptjs.genSaltSync(10)
		const hashedPassword = await bcryptjs.hashSync(password, salt);

		doctor.password = hashedPassword;

		doctor.confirmed = true;
		doctor.confirmToken = null;


		await doctor.save()

		return "Your successfully created your password please login using your email and password"

	}
}