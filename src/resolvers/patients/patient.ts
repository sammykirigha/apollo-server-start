import { Arg, Ctx, Mutation, Query } from "type-graphql";
import { sequelize } from "../../../models";
import { PatientContext } from "../../interfaces/context.interface";
import { CreatePatientInput, Patient, } from "../../schemas/patients/patient";


export class PatientResolver {
	@Query(returns => ([Patient]))
	async getPatients(): Promise<([Patient])>{
		let patients = await sequelize.models.patients.findAll()

		return patients
	}

	@Mutation(returns => Patient, {
		description: "Create patient mutation"
	})
	async createPatient(
		@Ctx() ctx: PatientContext,
		@Arg('input', type => CreatePatientInput, {
			description: "Create Patients Input"
		})
		input: CreatePatientInput
	): Promise<Patient> {


		// Add Patient
		const transaction = await sequelize.transaction();

		try {
			const patient = await sequelize.models.patients.create(input, {
				transaction
			})

			if (patient) {
				transaction.commit();
			}
			return patient;


		} catch (error) {
			await transaction.rollback();
			throw error;

		}
	}
}