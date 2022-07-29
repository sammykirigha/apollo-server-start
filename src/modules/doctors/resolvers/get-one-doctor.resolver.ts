import { Arg, Query } from "type-graphql";
import db from "../../../../models";
import { Doctor, GetSingleDoctorInputByEmail } from "../schemas/doctors";

export class GetSingleDoctorByEmail {
	@Query((returns) => Doctor)
	async getOneDoctor(
		@Arg('input', type => GetSingleDoctorInputByEmail, {
			description: "fetch one Doctor"
		})
		input: GetSingleDoctorInputByEmail
	): Promise<Doctor>{
		
		let data = await db.doctors.findOne({ where: { email: input.email }, include: [{
				model: db.appointments,
			}] })
		

		if (!data) {
			throw new Error("No Doctor like that found")
		}

		return data as Doctor
	}
}