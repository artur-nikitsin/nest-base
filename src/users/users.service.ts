import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../roles/roles.entity';
import { RoleEnum } from '../roles/enums/role.enum';

export type UserT = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  ////////////////////TEMP
  /* private readonly users = [
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
  }*/

  ////////////////////////////

  async getAll() {
    return this.usersRepository.find();
  }

  async getOne(id: string) {
    return this.usersRepository.findOne(id);
  }

  async getOneByUserName(userName: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ userName: userName });
  }

  async create(createUserDto: CreateUserDto) {
    const roles = await this.rolesRepository.find();
    const userRole = roles.find(
      (role) => role.role.toLocaleLowerCase() === 'user',
    );

    const user = { ...new User(), ...createUserDto };
    user.password = '12345';
    user.roles = [userRole];
    return await this.usersRepository.save(user);
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
