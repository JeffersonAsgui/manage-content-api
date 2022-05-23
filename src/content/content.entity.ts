import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    detail: string;

}