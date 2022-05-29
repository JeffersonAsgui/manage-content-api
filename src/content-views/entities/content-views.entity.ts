import { Entity, PrimaryColumn, } from "typeorm";

@Entity()
export class ContentViews {

    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    contentDetailId: number;

}