import { Arg, Mutation } from "type-graphql";
import db from "../../../../models";
import { HandleSingleDoctorInput } from "../schemas/doctors";


export class DeleteDoctorsResolver {

	@Mutation(() => String, {
		description: "delete doctor mutation"
	})
	async deleteDoctor(
		@Arg('input', type => HandleSingleDoctorInput, {
			description: "login doctors Input"
		})
		input: HandleSingleDoctorInput,
	): Promise<string> {

		const doctor = await db.doctors.findOne({ where: { id: input.id } })
		
		if (!doctor) {
			throw new Error("user input error....")
		}

		await db.doctors.destroy({ where: { id: input.id } })
		
		return "User deleted successfully";
	}
}