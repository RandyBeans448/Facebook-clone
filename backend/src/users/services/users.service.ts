import { Body, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, JoinTable, Repository, UpdateResult } from 'typeorm';

import { UsersInterface } from '../models/Users.interface';
import { UsersEntity } from '../models/users.entity';

import * as bcrypt from 'bcrypt';



@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>,
    ) {}

    async findUserByEmail(username: string) {
        console.log(username, "find user by email");
        const user = await this.usersRepository.findOne({username});

        if (!user) {
            throw new Error;
        }

        console.log(user, "found user");
        return user;
    }

    async createUser(user: UsersInterface): Promise<UsersEntity> {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        console.log(user,"");

        if (!user) {
            throw new Error;
        }
       
        return this.usersRepository.save(user);
    }

    async getUser(id: number) {

        const user = await this.usersRepository.findOne(id);
        console.log(user)
    
        if (!user) {
            throw new Error;
        }
    }

    //Get current user
    async getCurrentUser(id: number) {
   
        const user = await this.usersRepository.findOne(id);

        if (!user) {
            throw new Error;
        }
        return user
    }

    //upload image
    async uploadAvatar(id: number, image: string): Promise<UpdateResult> {

        const user = await this.usersRepository.findOne(id);

        if (!user) {
            throw new Error;
        }

        user.id = id;
        user.image = image;

        return this.usersRepository.update(id, { image });
    }

    //upload background
    async uploadBackground(id: number, background: string): Promise<UpdateResult> {

        const user = await this.usersRepository.findOne(id);

        if (!user) {
            throw new Error;
        }

        user.id = id;
        user.background = background;

        return this.usersRepository.update(id, { background });
    }

    // //update about
    // async updateAbout(id: number, about: string): Promise<UpdateResult> {

    //     const user = await this.usersRepository.findOne(id);

    //     if (!user) {
    //         throw new Error;
    //     }

    //     user.id = id;
    //     user.about = about;

    //     return this.usersRepository.update(id, { about });
    // }

    //delete account
    async deleteAccount(id: number): Promise<DeleteResult> {

        const user = await this.usersRepository.findOne(id)
        
        if (!user) {
            throw new Error;
        }
        return this.usersRepository.delete(user);
    }
}
