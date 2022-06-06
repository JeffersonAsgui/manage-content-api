import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { UserType } from '../enum/user.enum';

@InputType()
export class CreateUserInput {

  @IsString()
  @MinLength(3, { message: "Name field minimum 3 character" })
  @MaxLength(60, { message: "Name field maximum 60 charactery" })
  @IsNotEmpty({ message: "Name field cannot be empty" })
  name: string;

  @IsString()
  @IsNotEmpty({ message: "Type field cannot be empty" })
  @IsEnum(UserType, { message: 'User Type field no valid' },)
  @IsOptional()
  type?: UserType;

}