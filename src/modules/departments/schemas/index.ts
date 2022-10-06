import { IsNotEmpty } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";


@ObjectType()
export class Department {
  @Field({description: "department id "})
  id: string;

  @Field()
  department_name: string;
}

@InputType()
export class CreateDepartmentInput {

	@Field({
		nullable: false,
		description: "department name"
	})
	@IsNotEmpty()
	department_name: string

}