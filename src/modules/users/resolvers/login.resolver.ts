import { UserInputError } from "apollo-server-express";
import { Arg, Ctx, Mutation } from "type-graphql";
import db from "../../../../models";
import bcryptjs from 'bcryptjs'
import { sign } from "jsonwebtoken";
import { LoginUserInput, User } from "../schemas/user";


export class LoginResolver {

	@Mutation(returns => User, {
		description: "login patient mutation"
	})
	async loginUser(
		@Arg('input', type => LoginUserInput, {
			description: "login Patients Input"
		})
		input: LoginUserInput,
	): Promise<User | null> {

		let user = await db.logged_in_users.findOne({ where: { email: input.email } })
		console.log('logging in user', user);
		
		
		if (!user) {
			throw new UserInputError(
				"Invalid credentials "
			)
		}

		const isValid = await bcryptjs.compare(input.password, user.password)

		if (!isValid) {
			throw new UserInputError(
				"Invalid credentials"
			)
		} const newToken = sign({
			id: user.id,
			status: user.status,
		}, 'sammykightgfhgcvbnb', { expiresIn: '24h' })

		user.token = newToken;
		return user;
	}
}