import { UsersInterface } from "src/users/models/Users.interface";

export interface AboutInterface {
    id: number,
    bio: string;
    workplace: string;
    school: string;
    university: string;
    currentCity: string;
    hometown: string;
    user: UsersInterface
}