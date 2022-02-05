import { ConnectionInterface } from "src/connections/models/connections.interface";
import { PostsInterface } from "src/posts/models/posts.interface";
import { ConversationInterface } from "src/conversation/models/conversation.interface";
import { PhotoInterface } from "src/photos/models/photos.interface";
import { AboutInterface } from "src/about/models/about.interface";

export interface UsersInterface {
    id?: number,
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    image?: string,
    background?: string,
    about?: AboutInterface[],
    posts?: PostsInterface[],
    connections?: ConnectionInterface[],
    conversations?: ConversationInterface[],
}