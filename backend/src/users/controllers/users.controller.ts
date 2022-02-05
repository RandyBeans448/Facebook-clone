import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseInterceptors, UploadedFile, UseGuards, Patch} from '@nestjs/common';
import { IsNumberString } from 'class-validator';
import { FileInterceptor, FileFieldsInterceptor, MulterModule } from '@nestjs/platform-express';
import { DeleteResult, UpdateResult } from 'typeorm';
import { from, Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { UsersEntity } from '../models/users.entity';
import { UsersInterface } from '../models/Users.interface';
import { UsersService } from '../services/users.service';

import { ConnectionInterface } from '../../connections/models/connections.interface';
import { ConnectionsService } from 'src/connections/services/connections.service';

import { PostsInterface } from 'src/posts/models/posts.interface';
import { PostsService } from 'src/posts/services/posts.services';

import { AuthService } from 'src/auth/auth.service';
  
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

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
    @Patch('upload/avatar/:id')
    @UseInterceptors(FileInterceptor('image', {dest: './upload'}))
    upload(@Param('id') id: number, @UploadedFile() image: string):Promise<UpdateResult> {
        return this.usersSerivce.uploadAvatar(id, image);
    }

    //Upload background picture   
    @UseGuards(JwtAuthGuard)
    @Patch('upload/background/:id')
    @UseInterceptors(FileInterceptor('image', {dest: './upload'}))
    uploadBackground(@Param('id') id: number, @UploadedFile() background: string):Promise<UpdateResult> {
        return this.usersSerivce.uploadBackground(id, background);
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

    // @UseGuards(JwtAuthGuard)
    // @Get('feed/:id')
    // getUser(@Param(':id') id: number) {
    //     return this.usersSerivce.getCurrentUser(id);
    // }

    @UseGuards(JwtAuthGuard)
    @Post('feed/:id')
    async posts(@Param('id') id: number, user: UsersInterface, @Body() posts: PostsInterface): Promise<PostsInterface> {
        const currentUser = await this.usersSerivce.getCurrentUser(id);
        return this.postsService.createPost(currentUser, posts)
    }

    // @UseGuards(JwtAuthGuard)
    @Post('profile/:id')
    @UseInterceptors(FileInterceptor('file', {}))
    async createPostFromProfile(@Param('id') id: number, user: UsersInterface, @Body() posts: PostsInterface): Promise<PostsInterface> {
        console.log()
        const currentUser = await this.usersSerivce.getCurrentUser(id);
        return this.postsService.createPost(currentUser, posts);
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