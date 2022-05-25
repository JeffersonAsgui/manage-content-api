import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ContentService } from './content.service';
import { CreateContentInput } from './dto/create-content.input';
import { UpdateContentInput } from './dto/update-content.input';
import { ContentDTO } from './dto/content.dto';
import { ContentDetailDTO } from 'src/content-detail/dto/content-detail.dto';
import { ContentDetailService } from 'src/content-detail/content-detail.service';
import { ConsoleLogger } from '@nestjs/common';
import { Console } from 'console';

@Resolver(() => ContentDTO)
export class ContentResolver {
    constructor(
        private contentService: ContentService,
        private contentDetailService: ContentDetailService
    ) { }


    @Query(() => [ContentDTO])
    async contents(): Promise<ContentDTO[]> {
        const contents = await this.contentService.findAllContent();
        return contents;
    }

    @Query(() => ContentDTO)
    async content(
        @Args('id') id: string
    ): Promise<ContentDTO> {
        const content = this.contentService.findContentById(id);
        return content;
    }

    @Mutation(() => ContentDTO)
    async createContent(
        @Args('data') data: CreateContentInput,
    ): Promise<ContentDTO> {

        if (data.detail != null) {
            const objDetail = await this.contentDetailService.createDetail(data.detail);
            const savedDetail = await this.contentDetailService.findDetailById(objDetail.id);
            data.detailId = savedDetail.id
        }
        const content = await this.contentService.createContent(data);
        return content;
    }

    @Mutation(() => ContentDTO)
    async updateContent(
        @Args('id') id: string,
        @Args('data') data: UpdateContentInput,
    ): Promise<ContentDTO> {
        const content = this.contentService.updateContent(id, data);
        return content;
    }

    @Mutation(() => Boolean)
    async deleteContent(
        @Args('id') id: string
    ): Promise<boolean> {
        const deleted = await this.contentService.deleteContent(id);
        return deleted;
    }

}
