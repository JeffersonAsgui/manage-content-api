import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ContentDetail } from './entities/content-detail.entity';
import { ContentDetailService } from './content-detail.service';
import { CreateContentDetailInput } from './dto/create-content-detail.input';
import { UpdateContentDetailInput } from './dto/update-content-detail.input';
import { ContentDetailDTO } from './dto/content-detail.dto';

@Resolver(() => ContentDetailDTO)
export class ContentDetailResolver {

    constructor(
        private detailService: ContentDetailService
    ) { }

    @Query(() => ContentDetailDTO)
    async contentDetail(
        @Args('id') id: string
    ): Promise<ContentDetailDTO> {
        const detail = this.detailService.findDetailById(id);
        return detail;
    }

    @Mutation(() => ContentDetailDTO)
    async createDetail(
        @Args('data') data: CreateContentDetailInput
    ): Promise<ContentDetailDTO> {
        const detail = await this.detailService.createDetail(data);
        return detail;
    }

    @Mutation(() => ContentDetailDTO)
    async updateDetail(
        @Args('id') id: string,
        @Args('data') data: UpdateContentDetailInput,
    ): Promise<ContentDetailDTO> {
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
