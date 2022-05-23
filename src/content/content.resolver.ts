import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Content } from './content.entity';
import { ContentService } from './content.service';
import { CreateContentInput } from './dto/create-content.input';
import { UpdateContentInput } from './dto/update-content.input';

@Resolver()
export class ContentResolver {
    constructor(
        private contentService: ContentService
    ) { }


    @Query(() => [Content])
    async contents(): Promise<Content[]> {
        const contents = await this.contentService.findAllContent();
        return contents;
    }

    @Query(() => Content)
    async content(
        @Args('id') id: string
    ): Promise<Content> {
        const content = this.contentService.findContentById(id);
        return content;
    }

    @Mutation(() => Content)
    async createContent(
        @Args('data') data: CreateContentInput
    ): Promise<Content> {
        const content = await this.contentService.createContent(data);
        return content;
    }

    @Mutation(() => Content)
    async updateContent(
        @Args('id') id: string,
        @Args('data') data: UpdateContentInput,
    ): Promise<Content> {
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
