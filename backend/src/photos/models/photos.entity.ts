import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { UsersEntity } from "src/users/models/users.entity";

@Entity('photos')
export class PhotoEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @ManyToOne(() => UsersEntity, user => user.photos)
    user: UsersEntity;

}