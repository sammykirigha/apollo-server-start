import { Arg, Mutation } from "type-graphql";
import db from "../../../../models";
import { DeleteDoctorInput } from "../schemas/doctors";


export class DeleteDoctorsResolver {

	@Mutation(() => String, {
		description: "delete doctor mutation"
	})
	async deleteDoctor(
		@Arg('input', type => DeleteDoctorInput, {
			description: "login doctors Input"
		})
		input: DeleteDoctorInput,
	): Promise<string> {

		const doctor = await db.doctors.findOne({ where: { id: input.id } })
		
		if (!doctor) {
			throw new Error("user input error....")
		}

		await db.doctors.destroy({ where: { id: input.id } })
		
		return "User deleted successfully";
	}
}