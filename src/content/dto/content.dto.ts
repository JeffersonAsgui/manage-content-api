import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ContentDetailDTO } from "src/content-detail/dto/content-detail.dto";

@ObjectType('Content')
export class ContentDTO {

    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    type: string;

    @Field()
    detailId?: string;



}