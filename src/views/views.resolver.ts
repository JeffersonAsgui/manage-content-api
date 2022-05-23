import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ViewsService } from './views.service';
import { View } from './entities/view.entity';
import { CreateViewInput } from './dto/create-view.input';
import { UpdateViewInput } from './dto/update-view.input';

@Resolver(() => View)
export class ViewsResolver {
  constructor(private readonly viewsService: ViewsService) {}

  @Mutation(() => View)
  createView(@Args('createViewInput') createViewInput: CreateViewInput) {
    return this.viewsService.create(createViewInput);
  }

  @Query(() => [View], { name: 'views' })
  findAll() {
    return this.viewsService.findAll();
  }

  @Query(() => View, { name: 'view' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.viewsService.findOne(id);
  }

  @Mutation(() => View)
  updateView(@Args('updateViewInput') updateViewInput: UpdateViewInput) {
    return this.viewsService.update(updateViewInput.id, updateViewInput);
  }

  @Mutation(() => View)
  removeView(@Args('id', { type: () => Int }) id: number) {
    return this.viewsService.remove(id);
  }
}
