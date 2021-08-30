import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {globalLogger} from './logger.middleware'
import {HttpExceptionFilter} from "./http-exception.filter";
import {ValidationPipe} from "./validate.pipe";
import {RolesGuard} from "./roles.guard";
import {LoggingInterceptor} from "./logging.interceptor";
import {PrismaService} from "./service/prisma.service";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(globalLogger); // 全局中间件
    // app.useGlobalFilters(new HttpExceptionFilter()); // 全局过滤器
    // app.useGlobalPipes(new ValidationPipe());// 全局验证管道
    // app.useGlobalGuards(new RolesGuard()); // 全局守卫
    // app.useGlobalInterceptors(new LoggingInterceptor()); // 全局拦截器
    const prismaService: PrismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app); // Prisma 会干扰 NestJS enableShutdownHooks。Prisma 侦听关闭信号并process.exit()在您的应用程序关闭钩子触发之前调用。为了解决这个问题，你需要为 PrismabeforeExit事件添加一个监听器。
    await app.listen(3000);
}

bootstrap();
