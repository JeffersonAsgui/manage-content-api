import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ContentService } from './content.service';
import { CreateContentInput } from './dto/create-content.input';
import { UpdateContentInput } from './dto/update-content.input';
import { ContentDTO } from './dto/content.dto';
import { UserType } from 'src/user/enum/user.enum';
import { Roles } from 'src/auth/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(GqlAuthGuard, RolesGuard)
@Resolver(() => ContentDTO)
export class ContentResolver {
    constructor(
        private contentService: ContentService,
    ) { }

    //@UseGuards(GqlAuthGuard, RolesGuard)

    //@UseGuards(RolesGuard)
    @Roles(UserType.ADMIN, UserType.STUDENTS)
    @Query(() => [ContentDTO])
    async contents(): Promise<ContentDTO[]> {
        const contents = await this.contentService.findAllContent();
        return contents;
    }

    // @UseGuards(RolesGuard)
    @Roles(UserType.ADMIN)
    @Query(() => ContentDTO)
    async content(
        @Args('id') id: number
    ): Promise<ContentDTO> {
        const content = this.contentService.findContentById(id);
        return content;
    }

    @UseGuards(RolesGuard)
    @Roles(UserType.ADMIN)
    @Mutation(() => ContentDTO)
    async createContent(
        @Args('data') data: CreateContentInput,
    ): Promise<ContentDTO> {
        const content = await this.contentService.createContent(data);
        return content;
    }

    @UseGuards(GqlAuthGuard, RolesGuard)
    @Roles(UserType.ADMIN)
    @Mutation(() => ContentDTO)
    async updateContent(
        @Args('id') id: number,
        @Args('data') data: UpdateContentInput,
    ): Promise<ContentDTO> {
        const content = this.contentService.updateContent(id, data);
        return content;
    }

    @Roles(UserType.ADMIN)
    @Mutation(() => Boolean)
    async deleteContent(
        @Args('id') id: number
    ): Promise<boolean> {
        const deleted = await this.contentService.deleteContent(id);
        return deleted;
    }

}
