import { UserInputError } from "apollo-server-express";
import { Arg, Mutation, Resolver } from "type-graphql";
import db from "../../../../models";
import bcryptjs from 'bcryptjs'
import { PasswordResetInput } from "../schemas/patient";
import crypto from 'crypto';
import { Op } from "sequelize";

@Resolver()
export class ResetPasswordResolver {
	@Mutation(returns => String, {
		description: "reset patients password"
	})
	async resetPassword(
		@Arg('input', type => PasswordResetInput, {
			description: "Create Patients Input"
		})
		{ token, password }: PasswordResetInput
	): Promise<string> {


		const hashedResetToken = crypto
			.createHash("sha256")
			.update(token)
			.digest("hex");
		
		console.log(hashedResetToken);
		

		let patient = await db.patients.findOne({
			where:
			{
				passwordResetToken: hashedResetToken,
				passwordResetExpires: {
					[Op.gt]: Date.now()
				}
			}
		})

		if (!patient) {
			throw new UserInputError(
				"User not found...."
			)
		}

		const salt = await bcryptjs.genSaltSync(10)
		const hashedPassword = await bcryptjs.hashSync(password, salt);

		patient.password = hashedPassword;

		patient.passwordResetToken = null;
		patient.passwordResetExpires = null;


		await patient.save()

		return "Your password has been reset successfully"

	}
}