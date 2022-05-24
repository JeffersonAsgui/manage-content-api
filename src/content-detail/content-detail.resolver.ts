import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ContentDetail } from './content-detail.entity';
import { ContentDetailService } from './content-detail.service';
import { CreateContentDetailInput } from './dto/create-content-detail.input';
import { UpdateContentDetailInput } from './dto/update-content-detail.input';

@Resolver()
export class ContentDetailResolver {

    constructor(
        private detailService: ContentDetailService
    ) { }

    @Query(() => ContentDetail)
    async contentDetail(
        @Args('id') id: string
    ): Promise<ContentDetail> {
        const detail = this.detailService.findDetailById(id);
        return detail;
    }

    @Mutation(() => ContentDetail)
    async createDetail(
        @Args('data') data: CreateContentDetailInput
    ): Promise<ContentDetail> {
        const detail = await this.detailService.createDetail(data);
        return detail;
    }

    @Mutation(() => ContentDetail)
    async updateDetail(
        @Args('id') id: string,
        @Args('data') data: UpdateContentDetailInput,
    ): Promise<ContentDetail> {
        const detail = this.detailService.updateDetail(id, data);
        return detail;
    }

    @Mutation(() => Boolean)
    async deleteDetail(
        @Args('id') id: string
    ): Promise<boolean> {
        const deleted = await this.detailService.deleteDetail(id);
        return deleted;
    }
    
}
