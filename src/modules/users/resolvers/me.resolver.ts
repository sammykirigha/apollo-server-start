
import { Authorized, Ctx, Query } from "type-graphql";
import db from "../../../../models";
import { sign } from "jsonwebtoken";
import { User } from "../schemas/user";
import { Context } from "../../../common/interfaces/context.interface";

export class MeResolver {
	@Query(returns => User, {
		description: "get the current user"
	})
	@Authorized()
	async currentUser(
		@Ctx() ctx: Context): Promise<User | null> {

		let userId = ctx.user?.id

		if (!userId) {
			throw new Error("Invalid access token")
		}

		let user = await db.logginedInUsers.findByPk(userId)

		const newToken = sign(
			{
				id: user.id,
				status: user.status,
				email: user.email
			},
			'sammykightgfhgcvbnb',
			{ expiresIn: '24h' }
		)

		user.token = newToken;
		return user;
	}
}