import { Body, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, JoinTable, Repository, UpdateResult } from 'typeorm';
import { from, Observable } from 'rxjs';
import { PostsEntity } from '../models/posts.entity';
import { PostsInterface } from '../models/posts.interface';
import { UsersInterface } from 'src/users/models/Users.interface';


@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostsEntity)
        private readonly postsRespository: Repository<PostsEntity>
    ) {}

    async createPost(user: UsersInterface, posts: PostsInterface): Promise<PostsInterface> {
        const currentUser = user;
        const newPost = posts;
        newPost.user = currentUser;
        if (!newPost) {
            throw new Error;
        } else {
            return this.postsRespository.save(newPost);
        }
    }

    async getPosts() {
         return await this.postsRespository.find();
    }   

    getPostsId(id: number): Observable<PostsInterface> {
        return from(this.postsRespository.findOne({ id }, { relations: ['user'] }));
    }

    async revisePosts(id: number, postId: number, posts: PostsInterface): Promise<UpdateResult> {
      
        const foundPosts = await this.postsRespository.findOne(postId)

        if (!foundPosts) {
            throw new Error;
        }

        foundPosts.desc = posts.desc;
        foundPosts.image = posts.image;

        return this.postsRespository.update(postId, foundPosts)
    }

    async removePosts(id: number, postId: number):Promise<DeleteResult> {

        const post = await this.postsRespository.findOne(postId);

        return this.postsRespository.delete(post); 
    }
}