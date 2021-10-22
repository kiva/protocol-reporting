import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Report } from '../db/entity/report';
import { Logger } from 'protocol-common/logger';

/**
 * TODO update to work with graphql
 */
@Injectable()
export class ReportService {

    constructor(
        @InjectRepository(Report) private readonly reportRepo: Repository<Report>
    ) {}

    public async test() {
        const count = await this.reportRepo.count();
        Logger.log('Count:', count);
        return count;
    }
}
