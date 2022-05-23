import { Field, InputType } from "@nestjs/graphql";
import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";

@InputType()
export class CreateContentDetailInput {

    @IsString()
    @IsNotEmpty({ message: "Detail field cannot be empty" })
    detailDescription: string;

}