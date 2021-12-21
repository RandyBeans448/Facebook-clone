import { Body, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { UsersEntity } from '../models/users.entity';
import { UsersInterface } from '../models/Users.interface';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>
        
    ) {}
    
    async findUserByEmail(emailAddress: string) {
        const user = await this.usersRepository.findOne(emailAddress);
        return user;
    }

    async createUser(users: UsersInterface): Promise<UsersEntity> {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(users.password, salt);
        users.password = hash;
        if (users) {
            return this.usersRepository.save(users);
        }
        
    }

    uploadAvatar(id: number, image: string): Promise<UpdateResult> {
        const user: UsersInterface = new UsersEntity();
        user.id = id;
        user.image = image;
        return this.usersRepository.update(id, {image});
    }
}