import { Field, ID, InputType, PartialType } from "@nestjs/graphql";
import { CreateContentDetailInput } from "./create-content-detail.input";

@InputType()
export class UpdateContentDetailInput extends PartialType(CreateContentDetailInput) {

    @Field(() => ID)
    id: number;

}