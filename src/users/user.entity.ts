import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Review } from '../reviews/review.entity';
import { Role } from '../roles/roles.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    unique: true,
  })
  userName: string;

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;
  @Column()
  password: string;

  @Column({
    nullable: false,
  })
  firstName: string;

  @Column({
    nullable: false,
  })
  lastName: string;

  @ManyToOne(() => Role)
  @JoinColumn()
  roles: Role[];

  @OneToMany(() => Review, (review) => review.id)
  reviews: Review[];
}
