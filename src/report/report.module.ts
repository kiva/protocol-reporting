import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from '../db/entity/report';
import { ReportController } from './report.controller';

/**
 * TODO update to work with graphql
 */
@Module({
    imports: [
        TypeOrmModule.forFeature([Report]),
    ],
    controllers: [
        ReportController
    ],
    providers: [
        ReportService
    ],
})
export class ReportModule {}
