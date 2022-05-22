import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from './content.entity';
import { ContentRequest } from './dto/content-request';

@Injectable()
export class ContentService {
    constructor(
        @InjectRepository(Content)
        private contentRepository: Repository<Content>
    ) { }


    async createContent(data: ContentRequest): Promise<Content> {

        const content = await this.contentRepository.create(data);
        const contentSaved = await this.contentRepository.save(content);

        if (!contentSaved) {
            throw new InternalServerErrorException('Error in create content!');
        }

        return contentSaved;
    }
}
