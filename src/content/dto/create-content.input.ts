import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

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
    type: string;

    @IsString()
    detail: string;

}