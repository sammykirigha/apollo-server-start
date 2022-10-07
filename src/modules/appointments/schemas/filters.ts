import { Field, InputType } from "type-graphql";
import { DateFilter, StringFilter } from "../../../common/schema/search.schema";

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

