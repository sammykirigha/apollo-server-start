import { Arg, Mutation } from "type-graphql";
import db from "../../../../models";
import { UpdateAppointmentInput } from "../schemas/appointment";

export class UpdateAppointResolver {
	@Mutation(returns => String, {
		description: "updating an appointment"
	})
	async updateAppointment(
    @Arg('input', type => UpdateAppointmentInput, {
			description: "Create appointment input"
		})
		input: UpdateAppointmentInput
	): Promise<string>{

		let appointmentToUpdate = await db.appointments.findOne({ where: { id: input.id } })
		
		if (!appointmentToUpdate) {
			throw new Error("No such appointment found...")
		}

		const transaction = await db.sequelize.transaction();

		try {
			const newAppointment = await db.appointments.update(input, {where: {id: input.id}}, {
				transaction
			})

			if (newAppointment) {

				transaction.commit();


				return "Updated the appointment successfully"

			} else {
				throw new Error("Could not update appointment")
			}

		} catch (error) {
			await transaction.rollback();
			throw error;
		}
		
	}
}