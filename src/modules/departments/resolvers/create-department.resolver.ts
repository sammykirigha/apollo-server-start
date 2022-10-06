import { UserInputError } from "apollo-server-express";
import { Arg, Authorized, Ctx, Mutation } from "type-graphql";
import db from "../../../../models";
import { CreateDepartmentInput, Department } from "../schemas";

export class CreateDepartmentResolver {
	@Mutation(returns => Department, {
		description: "creating the department"
	})
	@Authorized()
	async createDepartment(
		@Ctx()
		@Arg('input', type => CreateDepartmentInput, {
			description: "CreateDEpartmentInput doctors Input"
		})
		input: CreateDepartmentInput
	): Promise<Department> {
		let department = await db.Departments.findOne({ where: { department_name: input.department_name } })

		if (department) {
			throw new UserInputError("that department already exixts")
		}

		const transaction = await db.sequelize.transaction();

		try {
			let department = await db.Departments.create({
				department_name: input.department_name
			}, {
				transaction
			})

			if (department) {
				return department as Department
			} else {
				throw new Error(`Something wrong happened!!!`);
			}

		} catch (error) {
			await transaction.rollback();
			throw error;
		}


	}

}