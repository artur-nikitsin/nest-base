import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User)
  @JoinTable()
  role: string;
}
