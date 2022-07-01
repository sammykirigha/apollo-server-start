import { Arg, Ctx, Mutation, Query } from "type-graphql";
import db from "../../../../models";
import { Context } from "../../../common/interfaces/context.interface";
import { CreateUserInput, User } from "../schemas";


export class UserResolver {

	@Query(returns => ([User]))
	async getUsers(): Promise<[User]> {
		let users = await db.users.findAll();

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
		const transaction = await db.sequelize.transaction();

		try {
			const user = await db.users.create(input, {
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