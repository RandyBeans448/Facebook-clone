import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/services/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) {

  }

  async validateUser(emailAddress: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(emailAddress);
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return user
        } else {
            return "This password does not match this email address"
        }
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.emailAddress, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
