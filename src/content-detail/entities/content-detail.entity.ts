import { Content } from "src/content/entities/content.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ContentDetail {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "description" })
    detailDescription: string;

    @OneToOne(() => Content, content => content.contentDetail, { nullable: true })
    content?: Content;

    @ManyToMany(() => User, (user) => user.contentDetails)
    @JoinTable({
        name: "content_views",
        joinColumn: {
            name: "userId",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "contentDetailId",
            referencedColumnName: "id"
        }
    })
    users: User[];

}