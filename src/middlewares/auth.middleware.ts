import { AuthChecker } from "type-graphql";
import { Context } from "../interfaces/context.interface";

export const authChecker: AuthChecker<Context> = ({ context: { user } }, roles) => {
	if (roles.length === 0) return user !== null;

	if (!user) {
		return false;
	}

	return roles.includes(user.role)
}