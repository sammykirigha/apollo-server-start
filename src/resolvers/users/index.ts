import { Arg, Ctx, Mutation, Query } from "type-graphql";
import { sequelize } from "../../../models";
import { Context } from "../../interfaces/context.interface";

import { CreateUserInput, User } from "../../schemas/users"


export class UserResolver {

	@Query(returns => ([User]))
	async getUsers(): Promise<([User])> {
		let users = await sequelize.models.users.findAll();

		return users;

	}

	@Mutation(returns => User, {
		description: "Create user mutation"
	})
	async createUser(
		@Ctx() ctx: Context,
		@Arg('input', type => CreateUserInput, {
			description: "Create User Input"
		})
		input: CreateUserInput
	): Promise<User> {


		// Add User
		const transaction = await sequelize.transaction();

		try {
			const user = await sequelize.models.users.create(input, {
				transaction
			})

			if (user) {
				transaction.commit();
			}
			return user;


		} catch (error) {
			await transaction.rollback();
			throw error;

		}
	}
}