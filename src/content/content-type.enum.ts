import { registerEnumType } from "@nestjs/graphql";

export enum ContentType {

    VIDEO = 'video',
    PDF = 'pdf',
    IMAGE = 'image',

}

registerEnumType(ContentType, { name: 'ContentType' })