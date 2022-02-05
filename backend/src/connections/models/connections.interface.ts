import { UsersInterface } from "src/users/models/Users.interface";

export interface ConnectionInterface {
    id: number,
    senderId: number,
    receiverId: number,
    firstName: string,
    lastName: string,
    jobTitle: string,
    accepted: boolean,
    user: UsersInterface
}
