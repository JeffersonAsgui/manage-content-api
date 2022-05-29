import { Module } from '@nestjs/common';
import { ContentViewsService } from './content-views.service';
import { ContentViewsResolver } from './content-views.resolver';
import { ContentViews } from './entities/content-views.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContentViews]),
  ],
  providers: [ContentViewsResolver, ContentViewsService],
  exports: [ContentViewsService]
})
export class ContentViewsModule { }
