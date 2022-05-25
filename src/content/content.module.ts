import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentResolver } from './content.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { ContentDetailModule } from 'src/content-detail/content-detail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Content]),
    ContentDetailModule
  ],
  providers: [ContentService, ContentResolver]
})
export class ContentModule { }
