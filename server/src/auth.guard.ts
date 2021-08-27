import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';


// export interface ExecutionContext extends ArgumentsHost {
//     getClass<T = any>(): Type<T>;
//     getHandler(): Function;
// }

function validateRequest(q):boolean{
    console.log("validate")
    return true
}

/**
 * 授权守卫
 */
@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return validateRequest(request);
    }
}
