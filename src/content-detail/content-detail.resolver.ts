import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ContentDetailService } from './content-detail.service';
import { CreateContentDetailInput } from './dto/create-content-detail.input';
import { UpdateContentDetailInput } from './dto/update-content-detail.input';
import { ContentDetailDTO } from './dto/content-detail.dto';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserType } from 'src/user/enum/user.enum';
import { UserService } from 'src/user/user.service';
import { ContentViewsService } from 'src/content-views/content-views.service';
import { CreateContentViewsInput } from 'src/content-views/dto/create-content-views.input';

@UseGuards(GqlAuthGuard, RolesGuard)
@Resolver(() => ContentDetailDTO)
export class ContentDetailResolver {

    constructor(
        private detailService: ContentDetailService,
        private userService: UserService,
        private viewsService: ContentViewsService,
    ) { }

    @Roles(UserType.ADMIN, UserType.STUDENTS)
    @Query(() => ContentDetailDTO)
    async contentDetailById(
        @Args('id') id: number,
        @Args('userId') userId: number
    ): Promise<ContentDetailDTO> {

        const detail = await this.detailService.findDetailById(id);

        const user = await this.userService.findById(userId);

        if (user?.type == UserType.STUDENTS) {
            const idContenteDetail = (await detail).id;
            const idUser = user.id
            this.viewsService.createViews(new CreateContentViewsInput(idUser, idContenteDetail));
        }

        return detail;
    }

    @Roles(UserType.ADMIN)
    @Mutation(() => ContentDetailDTO)
    async createDetail(
        @Args('data') data: CreateContentDetailInput
    ): Promise<ContentDetailDTO> {
        const detail = await this.detailService.createDetail(data);
        return detail;
    }

    @Roles(UserType.ADMIN)
    @Mutation(() => ContentDetailDTO)
    async updateDetail(
        @Args('id') id: number,
        @Args('data') data: UpdateContentDetailInput,
    ): Promise<ContentDetailDTO> {
        const detail = this.detailService.updateDetail(id, data);
        return detail;
    }

    @Roles(UserType.ADMIN)
    @Mutation(() => Boolean)
    async deleteDetail(
        @Args('id') id: number
    ): Promise<boolean> {
        const deleted = await this.detailService.deleteDetail(id);
        return deleted;
    }

}
