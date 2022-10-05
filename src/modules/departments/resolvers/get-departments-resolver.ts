import { Query  } from "type-graphql";
import db from "../../../../models";
import { Department } from "../schemas";
export class PatientResolver {

	@Query(returns => ([Department]))
	async getDepartments(): Promise<([Department])> {
		let departments = await db.Departments.findAll()

		return departments as [Department]
	}
}