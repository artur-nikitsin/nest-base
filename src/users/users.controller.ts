import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserValidationPipe } from './user.validation.pipe';
import { CreateUserSchema } from './schemas/create-user.validation.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateResult } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Get(':id')
  getOne(id: string) {
    return this.usersService.getOne(id);
  }

  @Post()
  @UsePipes(new UserValidationPipe(CreateUserSchema))
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  delete(id: string) {
    return this.usersService.delete(id);
  }
}
