import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseInterceptors, UploadedFile, UseGuards} from '@nestjs/common';
import { FileInterceptor, FileFieldsInterceptor, MulterModule } from '@nestjs/platform-express';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';

import { Express } from 'express'

import { UsersInterface } from '../models/Users.interface';
import { UsersService } from '../services/users.service';

import { AuthService } from 'src/auth/auth.service';

import { LocalAuthGuard } from 'src/auth/local-auth.guard';

@Controller()
export class UsersController {
    constructor(private usersSerivce: UsersService, private authService: AuthService) {

    }

    //Post requests
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
      }

    
    @Post('create-user')
    create(@Body() users: UsersInterface): Promise<UsersInterface> {
       return this.usersSerivce.createUser(users) 
    }

    @Post()
    postMemo(){

    }

    //Get requests

    @Get('home/:id')
    getPosts() {

    }

    @Get('home/:id')
    getUser() {

    }

    //Put requests

    @Put('upload/avatar/:id')
    @UseInterceptors(FileInterceptor('image', {dest: './upload'}))
    upload(@Param('id') id: number, @UploadedFile() image: string):Promise<UpdateResult> {
        return this.usersSerivce.uploadAvatar(id, image)
    }

}