import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from './entities/content.entity';
import { CreateContentInput } from './dto/create-content.input';
import { UpdateContentInput } from './dto/update-content.input';
import { ContentDTO } from './dto/content.dto';
import { CreateContentDetailInput } from 'src/content-detail/dto/create-content-detail.input';

@Injectable()
export class ContentService {
    constructor(
        @InjectRepository(Content)
        private contentRepository: Repository<Content>
    ) { }


    async findAllContent(): Promise<ContentDTO[]> {
        const content = await this.contentRepository.find({
            relations: ["detail"]
        });
        return content;
    }

    async findContentById(id: string): Promise<ContentDTO> {
        const content = await this.contentRepository.findOne(id);
        if (!content) {
            throw new NotFoundException('Content not found!');
        }
        return content;
    }

    async createContent(
        data: CreateContentInput):
        Promise<ContentDTO> {

        const content = this.contentRepository.create(data);

        const contentSaved = await this.contentRepository.save(content);

        if (!contentSaved) {
            throw new InternalServerErrorException('Error in create content!');
        }

        return contentSaved;
    }

    async updateContent(id: string, data: UpdateContentInput): Promise<ContentDTO> {
        const content = await this.findContentById(id);

        await this.contentRepository.update(content, { ...data });

        const contentUpdated = this.contentRepository.create({ ...content, ...data });
        return contentUpdated;

    }

    async deleteContent(id: string): Promise<boolean> {
        const content = await this.findContentById(id);
        const deletedContent = await this.contentRepository.delete(content);
        return deletedContent ? true : false;
    }

}
