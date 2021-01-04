import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userName: string, password: string): Promise<any> {
    try {
      const user = await this.userService.getUserWithRoles(userName);
      console.log('UserWithRole', user);

      if (user === undefined) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const comparedPassword = await bcrypt.compareSync(
        password,
        user.password,
      );

      if (comparedPassword) {
        return user;
      } else {
        throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
      }
      return null;
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: e.message,
        },
        HttpStatus.CONFLICT,
      );
    }
  }

  async login(user: any) {
    console.log('@user2', user);
    const payload = {
      userName: user.userName,
      sub: user.id,
      roles: user.roles.map((role) => role.role),
    };
    return {
      access_token: this.jwtService.sign(payload),
      userName: user.userName,
      roles: payload.roles,
    };
  }
}
