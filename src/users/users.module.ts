import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RolesGuard } from '../auth/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { Role } from '../roles/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [UsersController],
  providers: [
    UsersService,
    /*{
      provide: APP_GUARD,
      useClass: RolesGuard,
    },*/
  ],
  exports: [UsersService],
})
export class UsersModule {}
