import { MessagesInterface } from "src/messages/models/messages.interface";
import { UsersInterface } from "src/users/models/Users.interface";

export interface ConversationInterface {
    id: number,
    senderId: number,
    receiverId: number,
    messages: MessagesInterface[],
    senderUser: UsersInterface,
    receiverUser: UsersInterface,
}
