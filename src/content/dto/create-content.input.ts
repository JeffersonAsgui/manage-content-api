import { Field, InputType } from "@nestjs/graphql";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateContentDetailInput } from "src/content-detail/dto/create-content-detail.input";
import { ContentType } from "../enum/content-type.enum";

@InputType()
export class CreateContentInput {

    @IsString()
    @IsNotEmpty({ message: "Name field cannot be empty" })
    name: string;

    @IsString()
    @IsNotEmpty({ message: "Description field cannot be empty" })
    description: string;

    @IsString()
    @IsNotEmpty({ message: "Type field cannot be empty" })
    @IsEnum(ContentType, { message: 'Content Type field no valid' })
    type: ContentType;

    @Field(() => CreateContentDetailInput)
    contentDetail?: CreateContentDetailInput;

    contentDetailId?: number;

}