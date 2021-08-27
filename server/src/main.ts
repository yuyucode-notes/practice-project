import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {globalLogger} from './logger.middleware'
import {HttpExceptionFilter} from "./http-exception.filter";
import {ValidationPipe} from "./validate.pipe";
import {RolesGuard} from "./roles.guard";
import {LoggingInterceptor} from "./logging.interceptor";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(globalLogger); // 全局中间件
    // app.useGlobalFilters(new HttpExceptionFilter()); // 全局过滤器
    // app.useGlobalPipes(new ValidationPipe());// 全局验证管道
    // app.useGlobalGuards(new RolesGuard()); // 全局守卫
    // app.useGlobalInterceptors(new LoggingInterceptor()); // 全局拦截器
    await app.listen(3000);
}

bootstrap();
