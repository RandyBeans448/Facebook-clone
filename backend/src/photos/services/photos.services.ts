import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, JoinTable, Repository, UpdateResult } from 'typeorm';
import { PhotoEntity } from '../models/photos.entity';
import { from, Observable } from 'rxjs';

@Injectable()
export class PhotoService {
    constructor(
        @InjectRepository(PhotoEntity)
        private readonly photoRespository: Repository<PhotoEntity>
    ) {}

}
