import { Arg, Mutation } from "type-graphql";
import db from "../../../../models";
import { UpdateDoctorInput } from "../schemas/doctors";

export class UpdateDoctorResolver {
	@Mutation(returns => String, {
		description: "updating an doctor"
	})
	async updateDoctor(
    @Arg('input', type => UpdateDoctorInput, {
			description: "update doctor input"
		})
		input: UpdateDoctorInput
	): Promise<string>{

		let doctor = await db.doctors.findOne({ where: { id: input.id } })
		
		if (!doctor) {
			throw new Error("No such doctor found...")
		}

		const transaction = await db.sequelize.transaction();

		try {
			const newDoctor = await db.doctors.update(input, {where: {id: input.id}}, {
				transaction
			})

			if (newDoctor) {

				transaction.commit();


				return "Updated the doctor successfully"

			} else {
				throw new Error("Could not update doctor")
			}

		} catch (error) {
			await transaction.rollback();
			throw error;
		}
		
	}
}