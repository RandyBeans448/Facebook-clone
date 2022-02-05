import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { IsNotEmpty } from 'class-validator';
import { UsersEntity } from "src/users/models/users.entity";

@Entity('connections')
export class ConnectionsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({nullable: false})
    senderId: number;

    @IsNotEmpty()
    @Column({nullable: false})
    receiverId: number;
    
    @IsNotEmpty()
    @Column({nullable: false})
    firstName: string;

    @IsNotEmpty()
    @Column({nullable: false})
    lastName: string;

    @IsNotEmpty()
    @Column({nullable: false})
    jobTitle: string;

    @Column({nullable: false})
    accepted: boolean;

    @ManyToOne(() => UsersEntity, user => user.connections)
    user: UsersEntity;
}

