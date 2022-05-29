import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { UserDTO } from "src/user/dto/user.dto";

@ObjectType("Auth")
export class AuthDTO {

    @Field(() => UserDTO)
    user: UserDTO

    @Field()
    token: string
}