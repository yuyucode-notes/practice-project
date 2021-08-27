// 响应映射

import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
    data: T;
}

/**
 * 用于返回统一的格式
 */

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        console.log(TransformInterceptor.name, "拦截之前")
        return next.handle().pipe(map(data => {
            // data 为 cats.controller 类的create方法返回的值
            console.log(data)
            // {
            //     "name": "yuyu",
            //     "age": 1,
            //     "breed": 123123213213213
            // }

            // 响应给客户端
            return { data }
        }));
    }
}
