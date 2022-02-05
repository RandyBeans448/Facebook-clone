import { Body, Injectable } from '@nestjs/common';
import { ConversationEntity } from '../models/conversation.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, JoinTable, Repository, UpdateResult } from 'typeorm';
import { from, Observable } from 'rxjs';

@Injectable()
export class ConversationService {
    constructor(
        @InjectRepository(ConversationEntity)
        private readonly conversationRespository: Repository<ConversationEntity>
    ) {}
}