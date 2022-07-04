import { UserInputError } from "apollo-server-express";
import { Arg, Mutation, Resolver } from "type-graphql";
import db from "../../../../models";
import bcryptjs from 'bcryptjs'
import { ConfirmEmailInput, PasswordResetInput } from "../schemas/patient";
import crypto from 'crypto';
import { Op } from "sequelize";

@Resolver()
export class ConfirmEmailResolver {
	@Mutation(returns => String, {
		description: "email your email"
	})
	async confirmPassword(
		@Arg('input', type => ConfirmEmailInput, {
			description: "Create Patients Input"
		})
		{ token }: ConfirmEmailInput
	): Promise<string> {


		const hashedAuthToken = crypto
			.createHash("sha256")
			.update(token)
			.digest("hex");
		
		let patient = await db.patients.findOne({
			where:
			{
				confirmToken: hashedAuthToken
			}
		})

		if (!patient) {
			throw new UserInputError(
				"User not found...."
			)
		}

		if (patient.confirmToken !== hashedAuthToken) {
			throw new UserInputError("an error occured")
		};

		return "You can continue to log in with your credentials...."

	}
}