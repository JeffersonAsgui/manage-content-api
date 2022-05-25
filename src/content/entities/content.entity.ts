import { ContentDetail } from "src/content-detail/entities/content-detail.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Content {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    type: string;

    @OneToOne(type => ContentDetail, content => content.id, { cascade: true, nullable: true })
    detail?: ContentDetail;

    @Column({ nullable: true })
    detailId?: string;

}