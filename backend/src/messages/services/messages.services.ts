import { Body, Injectable } from '@nestjs/common';
import { MessagesEntity } from '../models/messages.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, JoinTable, Repository, UpdateResult } from 'typeorm';
import { from, Observable } from 'rxjs';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(MessagesEntity)
        private readonly messagesRespository: Repository<MessagesEntity>
    ) {}
}