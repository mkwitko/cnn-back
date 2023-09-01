import { Controller, Post, UseGuards, Request, Ip } from '@nestjs/common';
import { LocalAuthGuard } from './Passport/Guards/local-auth.guard';
import { AuthService } from './auth.service';
// import { UsersService } from '../users/users.service';
import { CoreController } from 'src/core/CoreController';

@Controller('auth')
export class AuthController extends CoreController {
  constructor(service: AuthService) {
    super(service);
  }

  @Post('login')
  async login(@Request() req) {
    return await this.service.login(req.body);
  }

  @Post('register')
  async register(@Request() req) {
    const { email, password, name, isSuper } = req.body;
    const user = await this.service.register({
      email,
      password,
      name,
      isSuper,
    });
    return user;
  }
}
