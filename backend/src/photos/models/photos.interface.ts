import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { UsersEntity } from "src/users/models/users.entity";
import { UsersInterface } from "src/users/models/Users.interface";

export interface PhotoInterface {
    id: number,
    url: string;
    user: UsersInterface
}

