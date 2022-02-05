import { ConversationInterface } from "src/conversation/models/conversation.interface";

export interface MessagesInterface {
    id: number,
    senderId: number,
    receiverId: number,
    message: string,
    date: Date,
    conversation: ConversationInterface
}