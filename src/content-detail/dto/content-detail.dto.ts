import { Field, ID, ObjectType } from "@nestjs/graphql";
import { UserDTO } from "src/user/dto/user.dto";

@ObjectType('ContentDetail')
export class ContentDetailDTO {

    @Field(() => ID)
    id: number;

    detailDescription: string;

}