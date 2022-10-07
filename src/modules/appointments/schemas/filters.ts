import { Field, InputType, ObjectType } from "type-graphql";
import { PaginationInput, PaginationResult } from "../../../common/schema/paganation.schema";
import { DateFilter, StringFilter } from "../../../common/schema/search.schema";
import { Appointment } from "./appointment";
import { AppointmentSortColumn } from "./enums";



@ObjectType({ description: 'The user results' })
export class AppointmentPaginationOutput extends PaginationResult {
	@Field((type) => [Appointment!], { description: 'The Appointments!' })
	nodes: Appointment[];
}

@InputType({ description: 'Input to use when paginating Appointments' })
export class AppointmentPaginationInput extends PaginationInput {
	@Field((type) => AppointmentSortColumn, {
		description: 'Column to use when paginating',
		nullable: true,
		defaultValue: AppointmentSortColumn.ID,
	})
	column?: AppointmentSortColumn;
}


@InputType()
export class AppointmentBaseFilter {
	@Field((type) => StringFilter, { nullable: true })
	id?: StringFilter;

	@Field((type) => StringFilter, { nullable: true })
	patientId?: StringFilter;

	@Field((type) => DateFilter, { nullable: true })
	date?: DateFilter;
}

@InputType()
export class AppointmentFilter extends AppointmentBaseFilter {
	
	@Field((type) => [AppointmentBaseFilter], { nullable: true })
	or?: [AppointmentBaseFilter];

	@Field((type) => [AppointmentBaseFilter], { nullable: true })
	and?: [AppointmentBaseFilter]
}

