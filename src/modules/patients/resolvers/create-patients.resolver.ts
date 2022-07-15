import { UserInputError } from "apollo-server-express";
import { Arg, Mutation } from "type-graphql";
import db from "../../../../models";
import bcryptjs from 'bcryptjs'
import { CreatePatientInput, Patient } from "../schemas/patient";
import { sign } from "jsonwebtoken";
import sendMail from "../../../utils/sendEmail";
import crypto from 'crypto';
import loadTemplate from "../../../utils/loadEmailTemplate";

export class RegisterResolver {
	@Mutation(returns => Patient, {
		description: "Create patient mutation"
	})
	async createPatient(
		@Arg('input', type => CreatePatientInput, {
			description: "Create Patients Input"
		})
		input: CreatePatientInput
	): Promise<Patient> {

		let patient = await db.patients.findOne({ where: { email: input.email } })
		if (patient) {
			throw new UserInputError(
				"User with that email already exists"
			)
		}

		patient = await db.patients.findOne({ where: { phone: input.phone } })
		if (patient) {
			throw new UserInputError(
				"User with that phone number already exists"
			)
		}

		// Add Patient
		const transaction = await db.sequelize.transaction();

		try {
			const patient = await db.patients.create({
				...input
			}, {
				include: [
					{
						model: db.appointments,
					}
				],
			},
				{
					transaction
				})

			if (patient) {

				// const htmlData = await loadTemplate('register-email', { name: user.firstName, accountType: user.role })
				await sendMail({
					from: {
						name: "Samuel Kirigha",
						address: "sammydorcis@outlook.com"
					},
					to: `${patient.email}`,
					subject: "Patient Account Created",
					// text: "Please check your email to confirm before you continue. The email is valid for 30 min",
					html: `<p>You have successfully created an patient account.Please make complete your profile</p>`
				}
				)

				//update users table role for this patient
				const thisPatient = await db.users.findOne({ where: { email: patient.email } })
				
				if (thisPatient) {
					thisPatient.role = "patient"
					thisPatient.save()
				} else {
					throw new Error("Unexpected error occured please try again later")
				}


				transaction.commit();
				await patient.save()

				const token = sign({
					id: patient.id,
					status: patient.status,
				}, 'sammykightgfhgcvbnb', { expiresIn: '24h' })


				patient.token = token;
				return patient as Patient;
			} else {
				throw new Error(`Could not create patient`);
			}

		} catch (error) {
			await transaction.rollback();
			throw error;

		}
	}
}