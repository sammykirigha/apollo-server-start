import { UserInputError } from "apollo-server-express";
import { Arg, Mutation } from "type-graphql";
import db from "../../../../models";
import bcryptjs from 'bcryptjs'
import { CreatePatientInput, Patient } from "../schemas/patient";
import { sign } from "jsonwebtoken";
import sendMail from "../../../utils/sendEmail";
import { email } from "../../../utils/email";


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

		let user = await db.patients.findOne({ where: { email: input.email } })
		if (user) {
			throw new UserInputError(
				"User with that email already exists"
			)
		}

		user = await db.patients.findOne({ where: { phone: input.phone } })
		if (user) {
			throw new UserInputError(
				"User with that phone number already exists"
			)
		}

		const salt = await bcryptjs.genSaltSync(10)
		const hashedPassword = await bcryptjs.hashSync(input.password, salt);

		// Add Patient
		const transaction = await db.sequelize.transaction();

		try {
			const patient = await db.patients.create({
				...input,
				password: hashedPassword
			}, {
				transaction
			})

			if (patient) {
				transaction.commit();
			}

			const token = sign({
				id: patient.id,
				status: patient.status,
			}, 'sammykightgfhgcvbnb', { expiresIn: '24h' })


			patient.token = token;

			await sendMail({
				from: {
					name: "Doctris",
					address: `${patient.email}`
				},
				to: `ebba.tromp24@ethereal.email`,
				subject: "Confirmation Email",
				text: "Please check your email to confirm before you continue. The email is valid for 30 min",
				html: `<a href='http://localhost:3000/user/confirm/${patient.id}'>http://localhost:3000/user/confirm/${patient.id}</a>`
			}
			)

			// patient.confirmed = true


			console.log(patient);

			return patient;

		} catch (error) {
			await transaction.rollback();
			throw error;

		}
	}
}