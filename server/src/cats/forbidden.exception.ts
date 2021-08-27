import {HttpException, HttpStatus} from "@nestjs/common";

/**
 * 自定义异常
 *
 * @url https://docs.nestjs.cn/8/exceptionfilters?id=%e8%87%aa%e5%ae%9a%e4%b9%89%e5%bc%82%e5%b8%b8
 */
export class ForbiddenException extends HttpException {
    constructor(object, describe: string) {
        super(object, HttpStatus.FORBIDDEN);
    }
}
