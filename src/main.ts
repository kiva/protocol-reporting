import { NestFactory } from '@nestjs/core';
import { Logger } from 'protocol-common/logger';
import { AppModule } from './app/app.module';
import { AppService } from './app/app.service';

const bootstrap = async () => {
    const port = process.env.PORT;
    // Need to disable body parser for http-proxy to work for POSTs: https://github.com/nestjs/nest/issues/405
    const app = await NestFactory.create(AppModule, {
        bodyParser: false,
    });

    await AppService.setup(app);
    await app.listen(port);
    Logger.info(`Server started on ${port}`);
};

bootstrap().catch(e => {
    Logger.error(e.message);
});
