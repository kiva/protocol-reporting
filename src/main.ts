import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app/app.module.js';
import { AppService } from './app/app.service.js';

const bootstrap = async () => {
    const port = process.env.PORT;
    // Need to disable body parser for http-proxy to work for POSTs: https://github.com/nestjs/nest/issues/405
    const app = await NestFactory.create(AppModule, {
        bodyParser: false,
    });

    await AppService.setup(app);
    await app.listen(port);
    Logger.log(`Server started on ${port}`);
};

bootstrap().catch(e => {
    Logger.error(e.message);
});
