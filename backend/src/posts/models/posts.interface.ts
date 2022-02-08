import { UsersInterface } from "src/users/models/Users.interface";

export interface PostsInterface {
    id: number,
    profilePicture?: string,
    firstname: string,
    lastname: string,
    desc: string,
    image?: string,
    user: UsersInterface
}