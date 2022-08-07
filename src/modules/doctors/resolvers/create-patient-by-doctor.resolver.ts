import { UserInputError } from "apollo-server-express";
import { Arg, Mutation } from "type-graphql";
import db from "../../../../models";
import bcryptjs from 'bcryptjs';
import { sign } from "jsonwebtoken";
import sendMail from "../../../utils/sendEmail";
import loadTemplate from "../../../utils/loadEmailTemplate";
import { CreatePatientInput, Patient } from "../../patients/schemas/patient";

export class CreatePatientByDoctorResolver {
	@Mutation(returns => Patient, {
		description: "Create patient mutation"
	})
	async createPatientByDoctor(
		@Arg('input', type => CreatePatientInput, {
			description: "Create Patients Input"
		})
		input: CreatePatientInput
	): Promise<Patient> {

		let patient = await db.patients.findOne({ where: { email: input.email } })
		console.log('patient', patient);

		if (patient) {
			throw new UserInputError(
				"Patient with that email already exists......."
			)
		}

		patient = await db.patients.findOne({ where: { phone: input.phone } })
		if (patient) {
			throw new UserInputError(
				"Patient with that phone number already exists"
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
				console.log('<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>');
				let loggedInUser = await db.logged_in_users.findOne({ where: { user_id: patient.id } })
				console.log('<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>', loggedInUser);

				if (loggedInUser) {
					throw new UserInputError(
						"Logged in User with that user_id already exists!!!"
					)
				}

				const password = 'Sm?K123@!.';
				const role = 'patient';

				const salt = await bcryptjs.genSaltSync(10);
				const hashedPassword = await bcryptjs.hashSync(password, salt);

				const user_token = sign({
					id: patient.id,
					email: patient.email,
				}, 'sammykightgfhgcvbnb', { expiresIn: '24h' })
				

				const user = await db.logged_in_users.create({
					username: patient.email,
					user_id: patient.id,
					password: hashedPassword,
					email: patient.email,
					role: role,
					token: user_token,
					confirmed: true
				},
					{
						transaction
					}
				)

				console.log('<<<<<>>>>user', user);
				

				await user.save();

				await sendMail({
					from: {
						name: "Doctris Medial Hosptal",
						address: "sammydorcis@outlook.com"
					},
					to: `${patient.email}`,
					subject: "Patient Account Created",
					// text: "Please check your email to confirm before you continue. The email is valid for 30 min",
					html:
						`<p>
						You have successfully created a patient account. 
						Please login with ${patient.email} as usename/email and ${password} as your password. 
						Remember to change your password immediately you have login in
					</p>`
				}
				)



				transaction.commit();
				await patient.save();
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