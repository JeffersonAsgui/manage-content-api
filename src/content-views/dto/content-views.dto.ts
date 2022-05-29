import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType('ContentViews')
export class ContentViewsDTO {

    @Field()
    userId: number;

    @Field()
    contentDetailId: number;

}