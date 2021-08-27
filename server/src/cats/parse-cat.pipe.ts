import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ParseCatPipe implements PipeTransform<string, number> {
    transform(value, metadata: ArgumentMetadata): any {
        console.log(ParseCatPipe.name, "cat转换管道")
        value.age = parseInt(value.age, 10);
        value.breed = "" + value.breed;
        console.log(value)
        return value;
    }
}
