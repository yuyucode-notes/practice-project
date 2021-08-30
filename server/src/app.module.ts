import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CatsModule} from './cats/cats.module';
import {ConfigModule} from './config/config.module';
import {logger2, logger1} from "./logger.middleware";
import {APP_FILTER} from '@nestjs/core';
import {HttpExceptionFilter} from "./http-exception.filter";
import {ValidationPipe} from "./validate.pipe";
import {PostService} from "./service/post.service";
import {UserService} from "./service/user.service";
import {PrismaService} from "./service/prisma.service";


@Module({
    imports: [CatsModule, ConfigModule.register({folder: './config'})], // 导入模块
    controllers: [AppController], // 导入控制器，例如访问路由
    providers: [AppService,PostService,UserService,PrismaService
        // 全局过滤器
        // {
        //     provide: APP_FILTER,
        //     useClass: HttpExceptionFilter,
        // },
        // 验证管道
        // {
        //     provide: APP_FILTER,
        //     useClass: ValidationPipe
        // }
    ], // 提供者，方法,仅限本模块
})
export class AppModule implements NestModule {

    configure(consumer: MiddlewareConsumer) {
        // 中间件
        // forRoutes 连接将路由或控制器传递给当前配置的中间件。如果传递一个类（控制器），Nest会将中间件附加到该控制器中定义的每个路径上。
        // consumer.apply(logger1, logger2).forRoutes({path: 'cats', method: RequestMethod.GET});
        // consumer.apply(LoggerMiddleware).forRoutes("");
    }
}
