import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { IsEmpty, IsNotEmpty } from 'class-validator';
import { UsersEntity } from "src/users/models/users.entity";

@Entity('posts')
export class PostsEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @IsEmpty()
    @Column({nullable: true})
    profilePicture: string;

    @IsNotEmpty()
    @Column({nullable: true})
    firstname: string;

    @IsNotEmpty()
    @Column({nullable: true})
    lastname: string;

    @IsNotEmpty()
    @Column({nullable: false})
    desc: string;

    @IsEmpty()
    @Column({nullable: true})
    image: string;

    @ManyToOne(() => UsersEntity, user => user.posts)
    user: UsersEntity;
}