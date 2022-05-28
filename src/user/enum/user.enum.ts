import { registerEnumType } from "@nestjs/graphql";

export enum UserType {

    ADMIN = 'ADMIN',
    STUDENTS = 'STUDENTS',

}

registerEnumType(UserType, { name: 'UserType' })