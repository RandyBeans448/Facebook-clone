import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseInterceptors, UploadedFile, UseGuards, Patch, Req} from '@nestjs/common';
import { IsNumberString } from 'class-validator';
import { FileInterceptor, FileFieldsInterceptor, MulterModule } from '@nestjs/platform-express';
import { DeleteResult, UpdateResult } from 'typeorm';
import { from, Observable, of } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { saveImageToStorage } from '../image-helpers/image-storage';
import { join } from 'path';

import { UsersEntity } from '../models/users.entity';
import { UsersInterface } from '../models/Users.interface';
import { UsersService } from '../services/users.service';

import { ConnectionInterface } from '../../connections/models/connections.interface';
import { ConnectionsService } from 'src/connections/services/connections.service';

import { PostsInterface } from 'src/posts/models/posts.interface';
import { PostsService } from 'src/posts/services/posts.services';

import { AuthService } from 'src/auth/auth.service';
  
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { postsImageToStorage } from '../image-helpers/posts-image-storage';


@Controller()
export class UsersController {
    constructor(
        private usersSerivce: UsersService,
        private authService: AuthService,
        private connectionsService: ConnectionsService,
        private postsService: PostsService,
        ) {
    }

    //Post requests
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        console.log("loggin in")
        console.log(req.body, "request body")
        return this.authService.login(req.user);
    }
    
    @Post('create-account')
    create(@Body() user: UsersInterface): Promise<UsersInterface> {
       return this.usersSerivce.createUser(user); 
    }

    //Upload profile picture
    @UseGuards(JwtAuthGuard)
    @Patch('settings/:id')
    @UseInterceptors(FileInterceptor('image', saveImageToStorage))
    uploadAvatar(@Param('id') id: number, @UploadedFile() image: Express.Multer.File, @Request() req): Promise<UpdateResult> | {error: string} {
        const fileName = image?.filename
        console.log(fileName)
        if (!fileName) {
            return {error: 'File must be a png, jpeg, jgp'};
        }  else {
            return this.usersSerivce.uploadAvatar(id, fileName);
        }   
    }

    //Upload background picture
    @UseGuards(JwtAuthGuard)
    @Patch('settings/background/:id')
    @UseInterceptors(FileInterceptor('image', saveImageToStorage))
    uploadBackground(@Param('id') id: number, @UploadedFile() background: Express.Multer.File, @Request() req): Promise<UpdateResult> | {error: string} {
        const fileName = background?.filename
        console.log(fileName)
        if (!fileName) {
            return {error: 'File must be a png, jpeg, jgp'};
        }  else {
            return this.usersSerivce.uploadBackground(id, fileName);
        }   
    }

    // //@UseGuards(JwtAuthGuard)
    // @Patch('update/about/:id')
    // updateAbout(@Param('id') id: number, @Body() about: string):Promise<UpdateResult> {
    //     return this.usersSerivce.updateAbout(id, about);
    // }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    deleteAccount(@Param('id') id: number):Promise<DeleteResult> {
        return this.usersSerivce.deleteAccount(id);
    }

    //Relation requests

    //Connections relation

    @UseGuards(JwtAuthGuard)
    @Post('connections/:id/:userId')
    async createConnection(@Param('id') id: number, @Param('userId') userId: number, @Body() connection: ConnectionInterface): Promise<ConnectionInterface> {
        const currentUser = await this.usersSerivce.getCurrentUser(id);
        console.log("oioi")
        const newConnection = await this.usersSerivce.getCurrentUser(userId)
        return this.connectionsService.addConnection(currentUser, newConnection, connection)
    }

    @UseGuards(JwtAuthGuard)
    @Get('connections/:id')
    findConnectionById(@Param('id') id: number): Observable<ConnectionInterface> {
        return this.connectionsService.getConnection(id)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('connections/:id')
    async deleteConnection(@Param('id') id: number, @Param('connectionId') connectionId: number):Promise<DeleteResult> {
        return this.connectionsService.removeConnection(id, connectionId);
    }

    //Posts relation

    @UseGuards(JwtAuthGuard)
    @Get('feed/:id')
    getUser(@Param(':id') id: number) {
        return this.usersSerivce.getCurrentUser(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('feed/:id')
    @UseInterceptors(FileInterceptor('file', postsImageToStorage))
    async createPostFromMainFeed(@Param('id') id: number, @UploadedFile() image: Express.Multer.File, @Body() posts: PostsInterface, @Request() req): Promise<PostsInterface | { error: string; }> {
        const fileName = image?.filename
        const currentUser = await this.usersSerivce.getCurrentUser(id);
        console.log(fileName)
        if (!fileName) {
            return {error: 'File must be a png, jpeg, jgp'};
        }  else {
            return this.postsService.createPost(currentUser, fileName, posts);
        }   
    }

    @UseGuards(JwtAuthGuard)
    @Post('profile/:id')
    @UseInterceptors(FileInterceptor('file', postsImageToStorage))
    async createPostFromProfile(@Param('id') id: number, @UploadedFile() image: Express.Multer.File, @Request() req, @Body() posts: PostsInterface): Promise<PostsInterface | { error: string; }> {
        const fileName = image?.filename
        const currentUser = await this.usersSerivce.getCurrentUser(id);
        console.log(fileName)
        if (!fileName) {
            return {error: 'File must be a png, jpeg, jgp'};
        }  else {
            return this.postsService.createPost(currentUser, fileName, posts);
        }   
    }

    @UseGuards(JwtAuthGuard)
    @Get('feed/:id')
    async getAllPosts() {
        return this.postsService.getPosts();
    }

    @UseGuards(JwtAuthGuard)
    @Get('posts/:id')
    getPostsById(@Param('id') id: number): Observable<PostsInterface> {
        return this.postsService.getPostsId(id);
    }

    @UseGuards(JwtAuthGuard)    
    @Patch('posts/:id')
    async editPost(@Param('id') id: number, @Param('postId') postId: number, @Body() posts: PostsInterface):Promise<UpdateResult> {
        return this.postsService.revisePosts(id, postId, posts);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('posts/:id')
    async deletePost(@Param('id') id: number, @Param('postId') postId: number): Promise<DeleteResult> {
        return this.postsService.removePosts(id, postId);
    }
  
}