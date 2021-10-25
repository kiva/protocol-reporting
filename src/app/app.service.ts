import { Injectable, INestApplication } from '@nestjs/common';
import { json } from 'body-parser';
import { DatadogLogger } from 'protocol-common/datadog.logger';
import { Logger } from 'protocol-common/logger';
import { traceware } from 'protocol-common/tracer';
import { HttpConstants } from 'protocol-common/http-context/http.constants';

/**
 * Sets up global functionality
 * Note we don't use protocol exception filter because Graphql handles errors in it's own unique well
 * And we don't use swagger since Graphql provides it's own documentation
 */
@Injectable()
export class AppService {

    /**
     * Sets up app in a way that can be used by main.ts and e2e tests
     */
    public static async setup(app: INestApplication): Promise<void> {
        const logger = new Logger(DatadogLogger.getLogger());
        app.useLogger(logger);
        app.use(traceware(process.env.SERVICE_NAME));

        // Increase json parse size to handle encoded images
        app.use(json({ limit: HttpConstants.JSON_LIMIT }));
    }
}
