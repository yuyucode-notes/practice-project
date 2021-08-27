import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * 异常过滤器
 * @url https://docs.nestjs.cn/8/exceptionfilters?id=%e5%bc%82%e5%b8%b8%e8%bf%87%e6%bb%a4%e5%99%a8-1
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    /**
     * catch 捕获
     * @param exception 异常数据
     * @param host
     */
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const data = exception.getResponse();
        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                data
            });
    }
}
