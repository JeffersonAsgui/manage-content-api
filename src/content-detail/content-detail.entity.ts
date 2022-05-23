import { Field, ID, ObjectType } from "@nestjs/graphql";
import { type } from "os";
import { Content } from "src/content/content.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class ContentDetail {

    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: string;

    @Column({ name: "description" })
    detailDescription: string;

    @OneToOne(type => Content, detail => ContentDetail)
    content: Content;

}