import { UserInputError } from "apollo-server-express";
import { Arg, Mutation, Resolver } from "type-graphql";
import db from "../../../../models";
import crypto from 'crypto';
import sendMail from "../../../utils/sendEmail";


@Resolver()
export class ForgotPasswordResolver {
	@Mutation((returns) => String, {
		description: 'Forgot password'
	})
	async forgotPasssword(
		@Arg('email')
		email: string
	): Promise<string> {

		let patient = await db.patients.findOne({ where: { email } })

		if (!patient) {
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
			to: `${patient.email}`,
			subject: "Confirmation Email",
			text: "Please check your email to confirm before you continue. The email is valid for 30 min",
			html: `<p>To complete your change of sign-in method, please confirm your email address
					by clicking this link: <a href="${resetToken}">${resetToken}</a></p>`
		}
		)

		patient.passwordResetToken = passwordResetToken;
		patient.passwordResetExpires = passwordResetExpires;

		await patient.save();

		return "Password Reset link sent to the email provided"
	}
}