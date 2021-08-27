import {IsString, IsInt} from 'class-validator';



export class CreateCatDto {
    @IsString()
    name: string;

    @IsInt()
    age: number;

    @IsString()
    breed: string;
}

export class CreateCatQueryDto {
    @IsString()
    a: string;

    @IsInt()
    b: number;
}
