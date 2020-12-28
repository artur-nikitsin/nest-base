import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  getAll() {
    return this.usersRepository.find();
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
}
