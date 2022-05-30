import { ContentDetail } from 'src/content-detail/entities/content-detail.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserType } from '../enum/user.enum';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'varchar', length: 60 })
  name: string;

  @Column({ nullable: false, type: 'varchar', length: 20, default: UserType.STUDENTS })
  type: string;

}