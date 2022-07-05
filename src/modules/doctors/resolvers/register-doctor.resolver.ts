import { UserInputError } from "apollo-server-express";
import { Arg, Mutation } from "type-graphql";
import db from "../../../../models";
import bcryptjs from 'bcryptjs'
import { sign } from "jsonwebtoken";
import sendMail from "../../../utils/sendEmail";
import crypto from 'crypto';

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
				const authToken = crypto.randomBytes(32).toString("hex");
				const hashedAuthToken = crypto
					.createHash("sha256")
					.update(authToken)
					.digest("hex");

				const link = `https://promis.co.ke/logins/email/confirm/${authToken}`

				await sendMail({
					from: {
						name: "Samuel Kirigha",
						address: "sammydorcis@outlook.com"
					},
					to: `${patient.email}`,
					subject: "Confirmation Email",
					text: "Please check your email to confirm before you continue. The email is valid for 30 min",
					html: `<p>To complete your change of sign-in method, please confirm your email address
					by clicking this link: <a href="${link}">${link}</a></p>`
				}
				)

				// patient.confirmed = true
				transaction.commit();
				patient.confirmToken = hashedAuthToken;
				await patient.save()

				const token = sign({
					id: patient.id,
					status: patient.status,
				}, 'sammykightgfhgcvbnb', { expiresIn: '24h' })


				patient.token = token;
				return patient as Patient;
			} else {
				throw new Error(`Could not create user`);
			}

		} catch (error) {
			await transaction.rollback();
			throw error;

		}
	}
}