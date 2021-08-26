import {Module} from '@nestjs/common';
import {CatsController} from './cats.controller';
import {CatsService} from './cats.service';

@Module({
    controllers: [CatsController],
    providers: [CatsService],
    exports: [CatsService], // 此模块提供的可选提供商子集列表，这些提供商应该在导入此模块的其他模块中可用
})
export class CatsModule {}
