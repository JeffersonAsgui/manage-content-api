import { Field, InputType } from "@nestjs/graphql";
import { IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";

@InputType()
export class CreateContentViewsInput {

    constructor(userId: number, contentDetailId: number) {
        this.userId = userId;
        this.contentDetailId = contentDetailId
    }

    @IsNumber()
    @IsNotEmpty({ message: "User Id field cannot be empty" })
    userId: number;

    @IsNumber()
    @IsNotEmpty({ message: "Content Detail Id id field cannot be empty" })
    contentDetailId: number;

}