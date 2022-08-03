import { Arg, Mutation } from "type-graphql";
import db from "../../../../models";
import { GetSingleDoctorInputById } from "../schemas/doctors";


export class DeleteDoctorsResolver {

	@Mutation(() => String, {
		description: "delete doctor mutation"
	})
	async deleteDoctor(
		@Arg('input', type => GetSingleDoctorInputById, {
			description: "login doctors Input"
		})
		input: GetSingleDoctorInputById,
	): Promise<string> {

		const doctor = await db.doctors.findOne({ where: { id: input.id } })
		
		if (!doctor) {
			throw new Error("user input error....")
		}

		await db.doctors.destroy({ where: { id: input.id } })
		
		return "User deleted successfully";
	}
}