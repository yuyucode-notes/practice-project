import {Injectable} from '@nestjs/common';
import {Cat} from './interfaces/cat.interface';

@Injectable()
export class CatsService {
    private readonly cats: Cat[] = [];

    create(cat: Cat) {
        this.cats.push(cat);
        return cat
    }

    findAll(): Cat[] {
        return this.cats;
    }

    findOne(id:number){
        console.log(CatsService.name, typeof id, id)
        return `当前number: ${id}`
    }
}
