import {Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import {Reflector} from "@nestjs/core";

/**
 * matchRoles() 函数内部的逻辑可以根据需要简单或复杂。该示例的重点是显示防护如何适应请求/响应周期。
 */
function matchRoles(roles, user){
    console.log("matchRoles", roles, user)

     // throw new UnauthorizedException(); // 实际上，返回 false 的守卫会抛出一个 HttpException 异常。如果您想要向最终用户返回不同的错误响应，你应该抛出一个异常。
    // return false;
    return true
}


// export interface ExecutionContext extends ArgumentsHost {
//     getClass<T = any>(): Type<T>;
//     getHandler(): Function;
// }


/**
 * 基于角色认证
 */

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {

        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        console.log(roles)
        return true;
        // if (!roles) {
        //     return true;
        // }
        // const request = context.switchToHttp().getRequest();
        // const user = request.user;
        // return matchRoles(roles, user.roles);
    }
}
