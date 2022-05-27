import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ContentService } from './content.service';
import { CreateContentInput } from './dto/create-content.input';
import { UpdateContentInput } from './dto/update-content.input';
import { ContentDTO } from './dto/content.dto';

@Resolver(() => ContentDTO)
export class ContentResolver {
    constructor(
        private contentService: ContentService,
    ) { }


    @Query(() => [ContentDTO])
    async contents(): Promise<ContentDTO[]> {
        const contents = await this.contentService.findAllContent();
        return contents;
    }

    @Query(() => ContentDTO)
    async content(
        @Args('id') id: number
    ): Promise<ContentDTO> {
        const content = this.contentService.findContentById(id);
        return content;
    }

    @Mutation(() => ContentDTO)
    async createContent(
        @Args('data') data: CreateContentInput,
    ): Promise<ContentDTO> {
        const content = await this.contentService.createContent(data);
        return content;
    }

    @Mutation(() => ContentDTO)
    async updateContent(
        @Args('id') id: number,
        @Args('data') data: UpdateContentInput,
    ): Promise<ContentDTO> {
        const content = this.contentService.updateContent(id, data);
        return content;
    }

    @Mutation(() => Boolean)
    async deleteContent(
        @Args('id') id: number
    ): Promise<boolean> {
        const deleted = await this.contentService.deleteContent(id);
        return deleted;
    }

}
