import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType('User')
export class UserDTO {

    @Field(() => ID)
    id: number;

    @Field()
    name: string;

    @Field()
    type: string;

}