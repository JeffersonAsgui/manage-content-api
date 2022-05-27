import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Equal, In, Repository } from 'typeorm';
import { Content } from './entities/content.entity';
import { CreateContentInput } from './dto/create-content.input';
import { UpdateContentInput } from './dto/update-content.input';
import { ContentDTO } from './dto/content.dto';
import { ContentDetail } from 'src/content-detail/entities/content-detail.entity';
import { ContentDetailService } from 'src/content-detail/content-detail.service';
import { UpdateContentDetailInput } from 'src/content-detail/dto/update-content-detail.input';

@Injectable()
export class ContentService {
    constructor(
        @InjectRepository(Content)
        private contentRepository: Repository<Content>,

        private contentDetailService: ContentDetailService,
    ) { }


    async findAllContent(): Promise<ContentDTO[]> {
        const content = await this.contentRepository
            .createQueryBuilder('c')
            .leftJoinAndSelect(ContentDetail, 'cd', 'c.contentDetailId = cd.id')
            .orderBy('c.id')
            .getMany();
        return content;
    }

    async findContentById(id: number): Promise<ContentDTO> {
        const content = await this.contentRepository.findOne(id);
        if (!content) {
            throw new NotFoundException('Content not found!');
        }
        return content;
    }

    async createContent(
        data: CreateContentInput):
        Promise<ContentDTO> {
        if (data.contentDetail != null &&
            data.contentDetail.detailDescription.length > 0) {
            const objDetail = await this.contentDetailService.createDetail(data.contentDetail);
            data.contentDetailId = objDetail.id;
        }

        const content = this.contentRepository.create(data);

        const contentSaved = await this.contentRepository.save(content);

        if (!contentSaved) {
            throw new InternalServerErrorException('Error in create content!');
        }

        return contentSaved;
    }

    async updateContent(id: number, data: UpdateContentInput): Promise<ContentDTO> {
        const content = await this.findContentById(id);

        data = await this.validateAndUpdateDatail(data, content);

        const updateContent = this.mapperContentUpdate(data);

        await this.contentRepository.update(content, { ...updateContent });

        const contentUpdated = this.contentRepository.create({ ...content, ...updateContent });
        return contentUpdated;

    }

    async deleteContent(id: number): Promise<boolean> {
        const content = await this.findContentById(id);
        if (content.contentDetailId != 0) {
            const deletedDetatil = this.contentDetailService.deleteDetail(content.contentDetailId);
        }
        const deletedContent = await this.contentRepository.delete(content);
        return deletedContent ? true : false;
    }

    private mapperContentUpdate(data: UpdateContentInput): UpdateContentInput {
        const updateContent = new UpdateContentInput();
        updateContent.description = data.description;
        updateContent.name = data.name;
        updateContent.type = data.type;
        updateContent.contentDetailId = data.contentDetailId;
        return updateContent;
    }

    private async validateAndUpdateDatail(data: UpdateContentInput, content: ContentDTO): Promise<UpdateContentInput> {
        if (data.contentDetail != null &&
            data.contentDetail.detailDescription.length > 0
        ) {
            if (content.contentDetailId != 0) {
                const updateDatail = new UpdateContentDetailInput()
                updateDatail.id = content.contentDetailId
                updateDatail.detailDescription = data.contentDetail.detailDescription
                const result = await this.contentDetailService
                    .updateDetail(updateDatail.id, updateDatail);
                data.contentDetailId = result.id
            } else {
                const result = await this.contentDetailService
                    .createDetail(data.contentDetail);
                data.contentDetailId = result.id
            }
        }
        return data;
    }

}
