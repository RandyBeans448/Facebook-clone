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

  async validateUser(username: string, password: string): Promise<any> {
    console.log("start");
    console.log(username, "username");
    console.log(password, "password");
    const user = await this.usersService.findUserByEmail(username);
    console.log(user.password, "ello")
    console.log(user, "user");
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return user;
        } else {
            return "This password does not match this email address"
        }
    }
    return null;
  }

  async login(user: any) {
    console.log(user, "user for login")
    const payload = { username: user.username, sub: user.id };
    return {
      user: user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
