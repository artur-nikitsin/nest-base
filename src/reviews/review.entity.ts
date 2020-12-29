import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { IsDate } from 'class-validator';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userName: string;

  @Column()
  review: string;

  @Column()
  @IsDate()
  date: Date;

  @ManyToOne(() => User, (user) => user.id)
  forUser: User;

  @ManyToOne(() => User, (user) => user.id)
  author: User;
}
