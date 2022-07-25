import { Arg, Query } from "type-graphql";
import db from "../../../../models";
import { Doctor, HandleSingleDoctorInput } from "../schemas/doctors";

export class GetSingleAppointmentById {
	@Query((returns) => Doctor)
	async getOneDoctor(
		@Arg('input', type => HandleSingleDoctorInput, {
			description: "fetch one Doctor"
		})
		input: HandleSingleDoctorInput
	): Promise<Doctor>{
		
		let data = await db.doctors.findOne({ where: { id: input.id }, include: [{
				model: db.appointments,
			}] })
		

		if (!data) {
			throw new Error("No Doctor like that found")
		}

		return data as Doctor
	}
}