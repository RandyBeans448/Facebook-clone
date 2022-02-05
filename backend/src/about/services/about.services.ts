import { Body, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, JoinTable, Repository, UpdateResult } from 'typeorm';
import { AboutEntity } from '../models/about.entity';

import { from, Observable } from 'rxjs';

@Injectable()
export class AboutService {
    constructor(
        @InjectRepository(AboutEntity)
        private readonly aboutRespository: Repository<AboutEntity>
    ) {}
}