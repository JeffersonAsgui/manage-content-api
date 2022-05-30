import { ContentDetail } from "../../content-detail/entities/content-detail.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Content {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    type: string;

    @OneToOne(() => ContentDetail)
    contentDetail?: ContentDetail;

    @Column({ nullable: true, default: 0 })
    contentDetailId?: number;

}