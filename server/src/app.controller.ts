import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
} from '@nestjs/common';
import {User as UserModel, Post as PostModel} from '@prisma/client';

@Controller()
export class AppController {

    @Get()
    getHello(){
        return ""
    }
}