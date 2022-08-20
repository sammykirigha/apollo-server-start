import { UserInputError } from "apollo-server-express";
import { Arg, Mutation, Authorized, Ctx } from "type-graphql";
import db from "../../../../models";
import { sign } from "jsonwebtoken";
import sendMail from "../../../utils/sendEmail";
import crypto from 'crypto';
import { CreateDoctorInput, Doctor } from "../schemas/doctors";

export class RegisterResolver {
	@Mutation(returns => Doctor, {
		description: "Create doctor mutation"
	})
	@Authorized()
	async createDoctor(
		@Ctx()
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

				// const htmlData = await loadTemplate('register-email', { name: user.firstName, accountType: user.role })
				await sendMail({
					from: {
						name: "DevSam Medical Care ",
						address: "sammydorcis@outlook.com"
					},
					to: `${doctor.email}`,
					subject: "Patient Account Created",
					// text: "Please check your email to confirm before you continue. The email is valid for 30 min",
					html: `<p>You have successfully created an doctor account.Please make complete your profile</p>`
				}
				)


				//update users table role for this doctor
				const thisDoctor = await db.logged_in_users.findOne({ where: { email: doctor.email } })
				
				if (thisDoctor) {
					thisDoctor.role = "doctor"
					thisDoctor.user_id = doctor.id
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
				throw new Error(`Something wrong happened!!!`);
			}

		} catch (error) {
			await transaction.rollback();
			throw error;

		}
	}
}