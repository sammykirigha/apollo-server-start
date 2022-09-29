import { AuthChecker, MiddlewareFn } from "type-graphql";
import { Context } from "../common/interfaces/context.interface";

export const authChecker: AuthChecker<Context> = ({ context: { user } }, roles) => {
	if (roles.length === 0) return user !== null;

	console.log({user});
	

	if (!user) {
		return false;
	}

	return roles.includes(user.role)
}

export const isAuth: MiddlewareFn<Context> = async ({ context: { user } }, next) => {
	
	if (!user) {
		throw new Error("not authenticated")
	}


	return next()
}