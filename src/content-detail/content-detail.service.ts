import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentDetail } from './entities/content-detail.entity';
import { CreateContentDetailInput } from './dto/create-content-detail.input';
import { UpdateContentDetailInput } from './dto/update-content-detail.input';
import { ContentDetailDTO } from './dto/content-detail.dto';

@Injectable()
export class ContentDetailService {

    constructor(
        @InjectRepository(ContentDetail)
        private contentDetailRepository: Repository<ContentDetail>,
    ) { }

    async findDetailById(id: number): Promise<ContentDetailDTO> {
        const detailContent = await this.contentDetailRepository.findOne(id);
        if (!detailContent) {
            throw new NotFoundException('Content Detail not found!');
        }
        return detailContent;
    }

    async createDetail(data: CreateContentDetailInput): Promise<ContentDetailDTO> {

        const detail = this.contentDetailRepository.create(data);
        const detailSaved = await this.contentDetailRepository.save(detail);

        if (!detailSaved) {
            throw new InternalServerErrorException('Error in create content detail!');
        }

        return detailSaved;
    }


    async updateDetail(id: number, data: UpdateContentDetailInput): Promise<ContentDetailDTO> {
        const detail = await this.findDetailById(id);

        await this.contentDetailRepository.update(detail, { ...data });

        const detailUpdated = this.contentDetailRepository.create({ ...detail, ...data });
        return detailUpdated;

    }

    async deleteDetail(id: number): Promise<boolean> {
        const detail = await this.findDetailById(id);
        const deletedDetail = await this.contentDetailRepository.delete(detail);
        return deletedDetail ? true : false;
    }

}
