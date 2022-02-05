import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { IsNotEmpty, IsEmpty } from 'class-validator';
import { UsersEntity } from "src/users/models/users.entity";
import { MessagesEntity } from "src/messages/models/messages.entity";

@Entity('conversations')
export class ConversationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({nullable: false})
    senderId: number;

    @IsNotEmpty()
    @Column({nullable: false})
    receiverId: number;

    @IsEmpty()
    @OneToMany(() => MessagesEntity, message => message.conversation, { nullable: true })
    messages: MessagesEntity[];

    @ManyToOne(() => UsersEntity, user => user.conversations)
    senderUser: UsersEntity;

    @ManyToOne(() => UsersEntity, user => user.conversations)
    receiverUser: UsersEntity;
}
