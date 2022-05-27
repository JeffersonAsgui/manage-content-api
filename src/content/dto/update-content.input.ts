import { Field, InputType } from "@nestjs/graphql";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ContentType } from "../enum/content-type.enum";
import { CreateContentDetailInput } from "src/content-detail/dto/create-content-detail.input";

@InputType()
export class UpdateContentInput {


    @IsString()
    @IsNotEmpty({ message: "Name field cannot be empty" })
    @IsOptional()
    name?: string;

    @IsString()
    @IsNotEmpty({ message: "Description field cannot be empty" })
    @IsOptional()
    description?: string;

    @IsEnum(ContentType, { message: 'Content Type field no valid' })
    @IsNotEmpty({ message: "Type field cannot be empty" })
    @IsOptional()
    type?: ContentType;

    @IsOptional()
    contentDetail?: CreateContentDetailInput;

    @IsNumber()
    @IsOptional()
    contentDetailId?: number;

}