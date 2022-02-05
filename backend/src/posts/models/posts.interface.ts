import { UsersInterface } from "src/users/models/Users.interface";

export interface PostsInterface {
    id: number,
    desc: string,
    image?: string,
    user: UsersInterface
}