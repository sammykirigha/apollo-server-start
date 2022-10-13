import { Min } from 'class-validator';
import { Field, InputType, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class PaginationResult {
    @Field({
        description:
            'The total number of results regardless of pagination and filters provided',
    })
    totalCount: number;
  
    @Field({
        description:
            'The number of results included in this query (after pagination and filtering)',
    })
    count: number;

    @Field({
        description:
            'The possible number of pages. Calculated from the pagination input',
    })
    pageCount: number;
}

export enum SortDirection {
    ASC = 'ASC', //ascending order
    DESC = 'DESC', //descending order
}

@InputType({
    description: 'The number of results to start from and to include',
})
export class PaginationInput {
    @Field((type) => Int, {
        defaultValue: 0,
        description:
            'The page to start from. 1 based indexing (NOT 0 based). A value of 0 will start from page 1 (0 and 1 have the same meaning)',
    })
    @Min(0)
    page: number;

    @Field((type) => Int, {
        defaultValue: -1,
        description: 'The number of results to include. -1 means fetch all',
    })
    @Min(-1)
    count: number;

    @Field((type) => SortDirection, {
        description: 'The sort direction to use. Defaults to ASC',
        nullable: true,
        defaultValue: SortDirection.ASC,
    })
    sortDirection?: SortDirection;
}