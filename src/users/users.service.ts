import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export type UserT = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  ////////////////////TEMP
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<UserT | undefined> {
    return this.users.find((user) => user.username === username);
  }
  ////////////////////////////

  getAll() {
    return this.usersRepository.find();
  }

  getOne(id: string) {
    return this.usersRepository.findOne(id);
  }

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    const { userName, password, email, firstName, lastName } = createUserDto;

    user.userName = userName;
    user.password = password;
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;

    return this.usersRepository.save(user);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    const user = new User();
    const { userName, password, email, firstName, lastName } = updateUserDto;

    user.userName = userName;
    user.password = password;
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    return this.usersRepository.update(id, user);
  }

  delete(id: string) {
    return this.usersRepository.delete(id);
  }
}
