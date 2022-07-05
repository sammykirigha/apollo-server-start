import { UserInputError } from "apollo-server-express";
import { Arg, Ctx, Mutation } from "type-graphql";
import db from "../../../../models";
import bcryptjs from 'bcryptjs'
import { sign } from "jsonwebtoken";
import { Doctor, LoginDoctorInput } from "../schemas/doctors";


export class LoginResolver {

	@Mutation(returns => Doctor, {
		description: "login Doctor mutation"
	})
	async loginDoctor(
		@Arg('input', type => LoginDoctorInput, {
			description: "login Doctors Input"
		})
		input: LoginDoctorInput,
	): Promise<Doctor | null> {

		let doctor = await db.doctors.findOne({ where: { email: input.email } })
		
		if (!doctor) {
			throw new UserInputError(
				"Invalid credentials"
			)
		}

		const isValid = await bcryptjs.compare(input.password, doctor.password)

		if (!isValid) {
			throw new UserInputError(
				"Invalid credentials"
			)
		}
		
		const newToken = sign({
			id: doctor.id,
			status: doctor.email,
		}, 'sammykightgfhgcvbnb', { expiresIn: '24h' })

		doctor.token = newToken;

		return doctor as Doctor;
	}
}