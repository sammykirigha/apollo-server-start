import { Args, Field, ObjectType, Resolver, Root, Subscription } from "type-graphql";
import { Message } from "../schemas";


@ObjectType()
class NotificationPayload {
	@Field()
	message: Message
}


@ObjectType()
class Notification {
	@Field()
	message: Message
}


@Resolver()
export class ChatSubscriptionResolvers {
	@Subscription({
		topics: "NOTIFICATIONS",
	})
	newNotification(
		@Root() notificationPayload: NotificationPayload,

	): Notification {
		return notificationPayload
	}
}