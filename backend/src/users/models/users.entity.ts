import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { IsEmail, IsNotEmpty, IsEmpty } from 'class-validator';
import { ConnectionsEntity } from "../../connections/models/connections.entity";
import { PostsEntity } from "../../posts/models/posts.entity";
import { ConversationEntity } from "src/conversation/models/conversation.entity";
import { PhotoEntity } from "src/photos/models/photos.entity";
import { AboutEntity } from "src/about/models/about.entity";

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @IsNotEmpty()
  @Column({nullable: false})
  @IsEmail()
  firstName: string;

  @IsNotEmpty()
  @Column({nullable: false})
  lastName: string;

  @IsNotEmpty()
  @Column({nullable: false})
  username: string;

  @IsNotEmpty()
  @Column({nullable: false})
  password: string;

  @IsEmpty()
  @Column({nullable: true})
  image: string;

  @IsEmpty()
  @Column({nullable: true})
  background: string;

  @IsEmpty()
  @OneToMany(() => AboutEntity, about => about.user, { nullable: true })
  about: AboutEntity[];

  @IsEmpty()
  @OneToMany(() => PhotoEntity, photos => photos.user, { nullable: true })
  photos: PhotoEntity[];

  @IsEmpty()
  @OneToMany(() => PostsEntity, post => post.user, { nullable: true })
  posts: PostsEntity[];

  @IsEmpty()
  @OneToMany(() => ConnectionsEntity, connections => connections.user, { nullable: true })
  connections: ConnectionsEntity[];

  @IsEmpty()
  @OneToMany(() => ConversationEntity, conversations => conversations.senderUser, { nullable: true })
  conversations: ConversationEntity[];

}