import { UserInputError } from "apollo-server-express";
import { Arg, Mutation, Resolver } from "type-graphql";
import db from "../../../../models";
import crypto from 'crypto';
import sendMail from "../../../utils/sendEmail";
import { ForgotDoctorsPasswordInput } from "../schemas/doctors";


@Resolver()
export class ForgotDoctorsPasswordResolver {
	@Mutation((returns) => String, {
		description: 'Forgot password'
	})
	async forgotDoctorsPasssword(
		@Arg('email')
		{email}: ForgotDoctorsPasswordInput
	): Promise<string> {

		let doctor = await db.doctors.findOne({ where: { email } })

		if (!doctor) {
			throw new UserInputError("User not found")
		}

		const resetToken = crypto.randomBytes(32).toString("hex")
		const passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex")

		const passwordResetExpires = Date.now() + 20 * 60 * 1000;

		await sendMail({
			from: {
				name: "Samuel Kirigha",
				address: "sammydorcis@outlook.com"
			},
			to: `${doctor.email}`,
			subject: "Password reset Email",
			text: "Please check your email to confirm before you continue. The email is valid for 30 min",
			html: `<p>To complete your change of sign-in method, please confirm your email address
					by clicking this link: <a href="${resetToken}">${resetToken}</a></p>`
		}
		)

		doctor.passwordResetToken = passwordResetToken;
		doctor.passwordResetExpires = passwordResetExpires;

		await doctor.save();

		return "Password Reset link sent to the email provided"
	}
}