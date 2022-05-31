import { Injectable, INestApplication, Logger } from '@nestjs/common';
import bodyParser from 'body-parser';
import { HttpConstants, ProtocolLogger, traceware } from 'protocol-common';
import { ServiceReportDto } from './dtos/service.report.dto.js';

/**
 * Sets up global functionality
 * Note we don't use protocol exception filter because Graphql handles errors in it's own unique well
 * And we don't use swagger since Graphql provides it's own documentation
 */
@Injectable()
export class AppService {

    private static startedAt: Date;

    /**
     * Sets up app in a way that can be used by main.ts and e2e tests
     */
    // eslint-disable-next-line @typescript-eslint/require-await
    public static async setup(app: INestApplication): Promise<void> {
        app.useLogger(app.get(ProtocolLogger));
        app.use(traceware(process.env.SERVICE_NAME));
        AppService.startedAt = new Date();

        // Increase json parse size to handle encoded images
        app.use(bodyParser.json({ limit: HttpConstants.JSON_LIMIT }));
    }

    public generateStatsReport(): ServiceReportDto {
        Logger.log('stats report generated');
        const report: ServiceReportDto = new ServiceReportDto();
        report.serviceName = process.env.SERVICE_NAME;
        report.startedAt = AppService.startedAt.toDateString();
        report.currentTime = new Date().toDateString();
        report.versions = ['none'];

        // TODO: once we determine which items we want to check versions on
        // TODO: mostly likely we should report db information such as postgres version
        return report;
    }
}
