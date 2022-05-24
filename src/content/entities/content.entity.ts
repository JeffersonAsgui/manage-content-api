import { Field, ID, ObjectType } from "@nestjs/graphql"
import { type } from "os";
import { ContentDetail } from "src/content-detail/entities/content-detail.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Content {

    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    type: string;

    @OneToOne(type => ContentDetail, content => Content)
    @JoinColumn({ name: "detail_id" })
    detail: ContentDetail;

}