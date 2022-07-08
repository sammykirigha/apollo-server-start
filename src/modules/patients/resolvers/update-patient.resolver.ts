import { Arg, Mutation } from "type-graphql";
import db from "../../../../models";
import { UpdatePatientInput } from "../schemas/patient";

export class UpdatePatientResolver {
	@Mutation(returns => String, {
		description: "updating an patient"
	})
	async updatePatient(
    @Arg('input', type => UpdatePatientInput, {
			description: "update patient input"
		})
		input: UpdatePatientInput
	): Promise<string>{

		let patient = await db.patients.findOne({ where: { id: input.id } })
		
		if (!patient) {
			throw new Error("No such patient found...")
		}

		const transaction = await db.sequelize.transaction();

		try {
			const newPatient = await db.patients.update(input, {where: {id: input.id}}, {
				transaction
			})

			if (newPatient) {

				transaction.commit();


				return "Updated the patient successfully"

			} else {
				throw new Error("Could not update patient")
			}

		} catch (error) {
			await transaction.rollback();
			throw error;
		}
		
	}
}