import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../roles/roles.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  async getAll() {
    return this.usersRepository.find();
  }

  async getOne(id: string) {
    return this.usersRepository.findOne(id);
  }

  async getOneByUserName(userName: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ userName: userName });
  }

  async getUserWithRoles(userName: string) {
    return await this.usersRepository.findOne({
      relations: ['roles'],
      where: { userName: userName },
    });
  }

  async create(createUserDto: CreateUserDto) {
    const roles: Role[] = createUserDto.roles;
    let userRoles: Role[] = [];

    for (const role of roles) {
      const newRole = new Role();
      newRole.role = `${role}`;
      userRoles = [...userRoles, await this.rolesRepository.save(newRole)];
    }

    const user = { ...new User(), ...createUserDto };
    user.password = await bcrypt.hash(createUserDto.password, 10);
    user.roles = userRoles;
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
