import { Injectable } from '@nestjs/common';
import { EncryptService } from 'src/services/Encrypt/encrypt.service';
import { UsersService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private encrypt: EncryptService, private users: UsersService) {}

  async login(user: { email: string; password: string }) {
    const returnedUser = await this.users.get({
      where: {
        email: user.email,
      },
    });

    if (returnedUser.length === 0)
      return {
        status: false,
        data: 'User not found',
      };

    const confirmPassword = await this.encrypt.checkPassword(
      user.password,
      returnedUser[0].password,
    );

    if (!confirmPassword) {
      return {
        status: false,
        data: 'Password is wrong',
      };
    }
    return {
      status: true,
      data: returnedUser[0],
    };
  }

  async register(user: {
    email: string;
    password: string;
    name: string;
    isSuper: number;
  }) {
    const userFound = await this.users.get({
      where: {
        email: user.email,
      },
    });
    if (userFound.length > 0)
      return {
        status: false,
        data: 'User already exists',
      };
    const password = await this.encrypt.hashPassword(user.password);
    // const token = crypto.randomBytes(16).toString('base64');
    const createdUser = await this.users.create({
      email: user.email,
      password,
      name: user.name,
      super: user.isSuper || 1,
      //   token,
    });

    if (!createdUser)
      return {
        status: false,
        data: 'It was not possible to create the user',
      };

    // createdUser.token = token;

    return {
      status: true,
      data: createdUser,
    };
  }
}
