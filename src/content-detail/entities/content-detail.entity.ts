import { Content } from "src/content/entities/content.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ContentDetail {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "description" })
    detailDescription: string;

    @OneToOne(() => Content, content => content.contentDetail, { nullable: true })
    content?: Content;

}