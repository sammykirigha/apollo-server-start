import { UserInputError } from "apollo-server-express";
import { Arg, Mutation } from "type-graphql";
import db from "../../../../models";
import { sign } from "jsonwebtoken";
import sendMail from "../../../utils/sendEmail";
import crypto from 'crypto';
import { CreateDoctorInput, Doctor } from "../schemas/doctors";

export class RegisterResolver {
	@Mutation(returns => Doctor, {
		description: "Create doctor mutation"
	})
	async createDoctor(
		@Arg('input', type => CreateDoctorInput, {
			description: "Create doctors Input"
		})
		input: CreateDoctorInput
	): Promise<Doctor> {

		let doctor = await db.doctors.findOne({ where: { email: input.email } })
		if (doctor) {
			throw new UserInputError(
				"Your account already exist...."
			)
		}

		doctor = await db.doctors.findOne({ where: { phone: input.phone } })
		if (doctor) {
			throw new UserInputError(
				"Doctor with that phone number already exists"
			)
		}

		// Add doctor
		const transaction = await db.sequelize.transaction();

		try {
			const doctor = await db.doctors.create(input,
				{
					include: [
						{
							model: db.appointments,
						}
					],
				},
				{
					transaction
				})

			if (doctor) {

				await sendMail({
					from: {
						name: "Samuel Kirigha",
						address: "sammydorcis@outlook.com"
					},
					to: `${doctor.email}`,
					subject: "Confirmation Email",
					// text: "Please check your email to create your password. The email is valid for 30 min",
					html: `<p>You have been addded as a doctor...Complete your profile.</p>`
				}
				)

				//update users table role for this doctor
				const thisDoctor = await db.users.findOne({ where: { email: doctor.email } })
				
				if (thisDoctor) {
					thisDoctor.role = "doctor"
					thisDoctor.save()
				} else {
					throw new Error("Unexpected error occured please try again later")
				}
				transaction.commit();
				await doctor.save()

				const token = sign(
					{
						id: doctor.id,
						status: doctor.status,
					}, 'sammykightgfhgcvbnb',
					{ expiresIn: '24h' }
				)


				doctor.token = token;
				return doctor as Doctor;
			} else {
				throw new Error(`Could not create user`);
			}

		} catch (error) {
			await transaction.rollback();
			throw error;

		}
	}
}