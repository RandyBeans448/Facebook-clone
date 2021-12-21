import { Body, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { FeedPostEntity } from '../models/post.entity';
import { FeedPost } from '../models/post.interface';

import { Observable } from 'rxjs';
import { from } from 'rxjs';

@Injectable()
export class FeedService {
    constructor(
        @InjectRepository(FeedPostEntity)
        private readonly feedPostRepository: Repository<FeedPostEntity>
    ) {}

    createPost(feedPost: FeedPost): Observable<FeedPost> {
        return from(this.feedPostRepository.save(feedPost));
    }    

    findAllPosts(): Observable<FeedPost[]> {
        return from(this.feedPostRepository.find())
    }

    updatePost(id: number, feedPost: FeedPost): Observable<UpdateResult> {
        return from(this.feedPostRepository.update(id, feedPost));
    }

    deletePost(id: number): Observable<DeleteResult> {
        return from(this.feedPostRepository.delete(id))
    }
}

//Repository design pattern

/*
Here I am INJECTING the data from the FeedPostEntity.
TypeOrm abstracts the FeedPostEntity for us.
Will be given a varity of methods to interact with database.
*/ 
