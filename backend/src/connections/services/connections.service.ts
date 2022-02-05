import { Body, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, JoinTable, Repository, UpdateResult } from 'typeorm';
import { ConnectionsEntity } from '../models/connections.entity';
import { ConnectionInterface } from '../models/connections.interface';

import { UsersInterface } from 'src/users/models/Users.interface';

import { first, from, Observable } from 'rxjs';

@Injectable()
export class ConnectionsService {
    constructor(
        @InjectRepository(ConnectionsEntity)
        private readonly connectionRespository: Repository<ConnectionsEntity>
    ) {}

    async addConnection(user: UsersInterface, newConnection: UsersInterface, connection: ConnectionInterface): Promise<ConnectionInterface> {
        
        const currentUser = user;
        console.log(currentUser, "current user id");

        const lastestConnection = newConnection;
        console.log(lastestConnection, "new connection id")

        if (!newConnection || !user) {
            throw new Error
        } else {

            const senderConntectionCreation = connection;
            const receiverConnectionCreation = connection;

            senderConntectionCreation.senderId = currentUser.id;
            senderConntectionCreation.receiverId = lastestConnection.id;
            senderConntectionCreation.firstName = lastestConnection.firstName;
            senderConntectionCreation.lastName = lastestConnection.lastName;
            senderConntectionCreation.accepted = false;
            senderConntectionCreation.user = currentUser;

            receiverConnectionCreation.senderId = currentUser.id;
            receiverConnectionCreation.receiverId = lastestConnection.id;
            receiverConnectionCreation.firstName = currentUser.firstName;
            receiverConnectionCreation.lastName = currentUser.lastName;
            receiverConnectionCreation.accepted = false;
            receiverConnectionCreation.user = lastestConnection;

            this.connectionRespository.save(receiverConnectionCreation);
            return this.connectionRespository.save(senderConntectionCreation);
        }
    }

    getConnection(id: number): Observable<ConnectionInterface> {
        return from(this.connectionRespository.findOne({ id }, { relations: ['user'] }));
    }

    async removeConnection(id: number, skillsId: number): Promise<DeleteResult> {

        const foundConnection = await this.connectionRespository.findOne(skillsId);
    
        if (!foundConnection) {
            throw new Error;
        }
    
        return this.connectionRespository.delete(foundConnection);
    
       }

}