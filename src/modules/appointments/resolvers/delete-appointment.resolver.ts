import { Arg, Query } from "type-graphql";
import db from "../../../../models";
import { HandleSingleAppointmentInput } from "../schemas/appointment";

export class DeleteAppointment {
	@Query((returns) => String)
	async deleteAppointment(
		@Arg('input', type => HandleSingleAppointmentInput, {
			description: "fetch one appointment"
		})
		input: HandleSingleAppointmentInput
	): Promise<string>{
		
		 await db.appointments.destroy({ where: { id: input.id } })

		return "Appointment deleted successfully"
	}
}