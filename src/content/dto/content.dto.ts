import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType('Content')
export class ContentDTO {

    @Field(() => ID)
    id: number;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    type: string;

    @Field()
    contentDetailId?: number;


}