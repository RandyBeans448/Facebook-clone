import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, Timestamp } from "typeorm";
import { IsNotEmpty } from 'class-validator';
import { ConversationEntity } from "src/conversation/models/conversation.entity";

@Entity('messages')
export class MessagesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({nullable: false})
    senderId: number;

    @IsNotEmpty()
    @Column({nullable: false})
    receiverId: number;

    @IsNotEmpty()
    @Column()
    message: string;

    @IsNotEmpty()
    @Column()
    date: Date;

    @IsNotEmpty()
    @ManyToOne(() => ConversationEntity, (conversationEntity) => conversationEntity.messages)
    conversation: ConversationEntity;
}