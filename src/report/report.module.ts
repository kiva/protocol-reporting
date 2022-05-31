import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Report } from '../db/entity/report.js';
import { ReportDTO } from './report.dto.js';

/**
 * Use NestjsQuery to register typeorm with graphql and set the default resolvers
 */
@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([Report])],
            resolvers: [{ DTOClass: ReportDTO, EntityClass: Report }],
          }),
    ],

})
export class ReportModule {}
