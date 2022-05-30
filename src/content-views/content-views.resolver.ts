import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserType } from 'src/user/enum/user.enum';
import { ContentViewsService } from './content-views.service';
import { ContentViewsDTO } from './dto/content-views.dto';
import { CreateContentViewsInput } from './dto/create-content-views.input';

@UseGuards(GqlAuthGuard, RolesGuard)
@Resolver(() => ContentViewsDTO)
export class ContentViewsResolver {

  constructor(private readonly contentViewsService: ContentViewsService) { }

  @Roles(UserType.ADMIN, UserType.STUDENTS)
  @Mutation(() => ContentViewsDTO)
  createContentView(
    @Args('createContentViewInput') createContentViewInput: CreateContentViewsInput) {
    return this.contentViewsService.createViews(createContentViewInput);
  }

  @Roles(UserType.ADMIN)
  @Query(() => Number)
  async countSingleViews(
    @Args('contentDetailId') contentDetailId: number,
  ): Promise<Number> {
    return await this.contentViewsService.findSingleViewByContent(contentDetailId);
  }

}
