import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { ContentViewsService } from './content-views.service';
import { ContentViewsDTO } from './dto/content-views.dto';
import { CreateContentViewsInput } from './dto/create-content-views.input';

@UseGuards(GqlAuthGuard, RolesGuard)
@Resolver(() => ContentViewsDTO)
export class ContentViewsResolver {

  constructor(private readonly contentViewsService: ContentViewsService) { }

  @Mutation(() => ContentViewsDTO)
  createContentView(
    @Args('createContentViewInput') createContentViewInput: CreateContentViewsInput) {
    return this.contentViewsService.createViews(createContentViewInput);
  }

}
