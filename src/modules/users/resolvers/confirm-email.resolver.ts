import { UserInputError } from "apollo-server-express";
import { Arg, Mutation, Resolver } from "type-graphql";
import db from "../../../../models";
import bcryptjs from 'bcryptjs'
import { ConfirmEmailInput } from "../schemas/user";
import crypto from 'crypto';
import { Op } from "sequelize";

@Resolver()
export class ConfirmEmailResolver {
	@Mutation(returns => String, {
		description: "email your email"
	})
	async confirmPassword(
		@Arg('input', type => ConfirmEmailInput, {
			description: "confirm user eamil input"
		})
		{ token }: ConfirmEmailInput
	): Promise<string> {


		const hashedAuthToken = crypto
			.createHash("sha256")
			.update(token)
			.digest("hex");
		
		let user = await db.logged_in_users.findOne({where:{confirmToken: hashedAuthToken}})

		if (!user) {
			throw new UserInputError(
				"User not found...."
			)
		}

		user.confirmed = true;
		user.confirmToken = null;

		await user.save()


		return "You can continue to log in with your credentials...."

	}
}