import { Injectable, NestInterceptor, ExecutionContext, CallHandler, RequestTimeoutException } from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

/**
 * 拦截器： 让我们考虑另一个常见的用例。假设您要处理路由请求超时。如果您的端点在一段时间后未返回任何内容，则您将以错误响应终止。以下构造可实现此目的
 */
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            timeout(5000),
            catchError(err => {
                if (err instanceof TimeoutError) {
                    return throwError(() => new RequestTimeoutException(err));
                }
                return throwError(err);
            }),
        );
    };
};
