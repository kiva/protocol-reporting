import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from 'protocol-common/config.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import data from '../config/env.json';
import { OrmConfig } from '../ormconfig';
import { ReportModule } from '../report/report.module';

/**
 * Initializes the Nest application
 * Note we don't use the logging interceptor since graphql handles requests differently
 */
@Module({
    imports: [
        ConfigModule.init(data),
        OrmConfig(),
        GraphQLModule.forRoot({
            autoSchemaFile: true,
          }),
        ReportModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
    ],
})
export class AppModule {}
