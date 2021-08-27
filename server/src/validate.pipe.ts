import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';


/**
 * 验证管道
 */

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype ,data, type}: ArgumentMetadata) {
        // metatype DTO类
        // data 参数装饰器的参数
        // type 参数装饰器的名称
        console.log(ValidationPipe.name, "验证管道", metatype, data, type)
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        console.log(value)
        const object = plainToClass(metatype, value); //将普通(文字)对象转换为类(构造函数)对象。也适用于数组。
        const errors = await validate(object); // 验证对象
        if (errors.length > 0) {
            let _errors = errors.map(error => error.constraints)
            throw new BadRequestException(_errors);
        }
        return value;
    }

    /**
     * 当验证类型不是 JavaScript 的数据类型时，跳过验证。
     * @param metatype
     * @private
     */
    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}
