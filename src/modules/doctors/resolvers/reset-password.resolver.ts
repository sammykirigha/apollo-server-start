import { UserInputError } from "apollo-server-express";
import { Arg, Mutation, Resolver } from "type-graphql";
import db from "../../../../models";
import bcryptjs from 'bcryptjs'
import crypto from 'crypto';
import { Op } from "sequelize";
import { ResetDoctorsPasswordInput } from "../schemas/doctors";

@Resolver()
export class ResetDoctorsPasswordResolver {
	@Mutation(returns => String, {
		description: "reset doctors password"
	})
	async resetDoctorsPassword(
		@Arg('input', type => ResetDoctorsPasswordInput, {
			description: "Create Patients Input"
		})
		{ token, password }: ResetDoctorsPasswordInput
	): Promise<string> {


		const hashedResetToken = crypto
			.createHash("sha256")
			.update(token)
			.digest("hex");
		
		console.log(hashedResetToken);
		

		let doctor = await db.doctors.findOne({
			where:
			{
				passwordResetToken: hashedResetToken,
				passwordResetExpires: {
					[Op.gt]: Date.now()
				}
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

		doctor.passwordResetToken = null;
		doctor.passwordResetExpires = null;


		await doctor.save()

		return "Your password has been reset successfully"

	}
}