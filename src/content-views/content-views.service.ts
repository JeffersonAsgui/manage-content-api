import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentViewsDTO } from './dto/content-views.dto';
import { CreateContentViewsInput } from './dto/create-content-views.input';
import { ContentViews } from './entities/content-views.entity';

@Injectable()
export class ContentViewsService {

  constructor(
    @InjectRepository(ContentViews)
    private viewsRepository: Repository<ContentViews>,
  ) { }

  async createViews(data: CreateContentViewsInput): Promise<ContentViewsDTO> {

    const views = this.viewsRepository.create(data);
    const viewsSaved = await this.viewsRepository.save(views);

    if (!viewsSaved) {
      throw new InternalServerErrorException('Error in create Views !');
    }

    return viewsSaved;
  }

}
