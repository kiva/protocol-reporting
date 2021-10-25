import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import { ObjectType, GraphQLISODateTime, ID } from '@nestjs/graphql';

@ObjectType('Report')
export class ReportDTO {

    @IDField(() => ID)
    id!: number;

    @FilterableField(() => GraphQLISODateTime)
    create_time!: Date;

    @FilterableField()
    auth_method!: string;

    @FilterableField()
    verifier_id!: string;

    @FilterableField()
    verifier_user_id!: string;

    @FilterableField()
    request_id!: string;

    @FilterableField()
    session_id!: string;

    @FilterableField()
    result_code!: string;

    @FilterableField()
    success!: boolean;
}
