import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType('ContentDetail')
export class ContentDetailDTO {

    @Field(() => ID)
    id: string;

    detailDescription: string;

}