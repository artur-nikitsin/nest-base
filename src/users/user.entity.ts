import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Review } from '../reviews/review.entity';

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

  @OneToMany(() => Review, (review) => review.id)
  reviews: Review[];
}
