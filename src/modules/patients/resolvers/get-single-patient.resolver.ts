import { Arg, Query } from "type-graphql";
import db from "../../../../models";
import { Patient, HandleSinglePatientInput } from "../schemas/patient";

export class GetSingleAppointmentById {
	@Query((returns) => Patient)
	async fetchSinglePatient(
		@Arg('input', type => HandleSinglePatientInput, {
			description: "fetch one patient"
		})
		input: HandleSinglePatientInput
	): Promise<Patient> {

		let data = await db.patients.findOne({
			where: { id: input.id }, include: [{
				model: db.appointments,
			}]
		})

		if (!data) {
			throw new Error("No patient like that found")
		}

		return data as Patient
	}
}