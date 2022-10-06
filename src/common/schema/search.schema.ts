import { Field, InputType } from "type-graphql";


@InputType()
export class StringFilter {
	@Field({ nullable: true })
	eq?: string

	@Field({ nullable: true })
	like?: string

	@Field({ nullable: true })
	neq?: string

	@Field({ nullable: true })
	notlike?: string

	@Field({ nullable: true })
	isNull?: string

	@Field({ nullable: true })
	isNotNull?: string
}

@InputType()
export class NumberFilter {
	@Field({ nullable: true, description: "Equeal to" })
	eq?: number

	@Field({ nullable: true,  description: "less than" })
	lt?: number

	@Field({ nullable: true,  description: "greater than" })
	gt?: number

	@Field({ nullable: true,  description: "less that or equal to" })
	lte?: number

	@Field({ nullable: true,  description: "greater that or equal to" })
	gte?: number

	@Field({ nullable: true,  description: "is Null" })
	isNull?: boolean

	@Field({ nullable: true,  description: "Not Null" })
	isNotNull?: boolean

	@Field({ nullable: true,  description: "Not Equeal to" })
	neq?: number
}

@InputType()
export class DateFilter {
	@Field(type => String, { nullable: true, description: "Equal to" })
	eq?: String;

	@Field(type => String, { nullable: true, description: "Less than" })
	lt?: String;

	@Field(type => String, { nullable: true, description: "Geater than " })
	gt?: String;

	@Field(type => String, { nullable: true, description: "less than or Equal to" })
	lte?: String;

	@Field(type => String, { nullable: true, description: "greater than or equal to" })
	gte?: String;

	@Field(type => String, { nullable: true, description: "Equal to" })
	isNull?: boolean;

	@Field(type => String, { nullable: true, description: "Equal to" })
	isNotNull?: boolean;

	@Field(type => String, { nullable: true, description: "Equal to" })
	neq?: String;

}

@InputType()
export class BooleanFilter {
	@Field({ nullable: true, description: "Equal to" })
	eq?: boolean
	
	@Field({ nullable: true, description: "Equal to" })
	neq?:boolean
}