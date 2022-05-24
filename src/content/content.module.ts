import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentResolver } from './content.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { CreateContentInput } from './dto/create-content.input';

@Module({
  imports: [
    TypeOrmModule.forFeature([Content])
  ],
  providers: [ContentService, ContentResolver]
})
export class ContentModule { }
