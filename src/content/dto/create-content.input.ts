import { Field, InputType } from "@nestjs/graphql";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ContentType } from "../content-type.enum";

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

    @IsString()
    detail: string;

}