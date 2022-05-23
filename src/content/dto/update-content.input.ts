import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

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

    @IsString()
    @IsNotEmpty({ message: "Type field cannot be empty" })
    @IsOptional()
    type?: string;

    @IsString()
    @IsOptional()
    detail?: string;

}