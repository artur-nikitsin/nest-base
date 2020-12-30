import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './ local-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
}