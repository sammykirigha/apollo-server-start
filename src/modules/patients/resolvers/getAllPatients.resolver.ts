import { UserInputError } from "apollo-server-express";
import {  FieldResolver, Query, Resolver, Root } from "type-graphql";
import db from "../../../../models";
import {  Patient } from "../schemas/patient";



export class PatientResolver {

	@Query(returns => ([Patient]))
	async getPatients(): Promise<([Patient])>{
		let patients = await db.patients.findAll()

		return patients
	}
}