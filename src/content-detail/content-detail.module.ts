import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentDetail } from './entities/content-detail.entity';
import { ContentDetailService } from './content-detail.service';
import { ContentDetailResolver } from './content-detail.resolver';
import { UserService } from 'src/user/user.service';
import { ContentViewsService } from 'src/content-views/content-views.service';
import { UserModule } from 'src/user/user.module';
import { ContentViewsModule } from 'src/content-views/content-views.module';
@Module({
    imports: [
        TypeOrmModule.forFeature([ContentDetail]),
        UserModule,
        ContentViewsModule

    ],
    providers: [ContentDetailService, ContentDetailResolver],
    exports: [ContentDetailService]
})
export class ContentDetailModule { }
