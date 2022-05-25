import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentDetail } from './entities/content-detail.entity';
import { ContentDetailService } from './content-detail.service';
import { ContentDetailResolver } from './content-detail.resolver';

@Module({
    imports: [
        TypeOrmModule.forFeature([ContentDetail])
    ],
    providers: [ContentDetailService, ContentDetailResolver],
    exports: [ContentDetailService]
})
export class ContentDetailModule { }
