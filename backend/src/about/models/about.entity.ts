import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { IsEmpty } from 'class-validator';
import { UsersEntity } from "src/users/models/users.entity";

@Entity('about')
export class AboutEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @IsEmpty()
    @Column({nullable: false})
    bio: string;
    
    @IsEmpty()
    @Column({nullable: false})
    workplace: string;

    @IsEmpty()
    @Column({nullable: false})
    school: string;

    @IsEmpty()
    @Column({nullable: false})
    university: string;

    @IsEmpty()
    @Column({nullable: false})
    currentCity: string;

    @IsEmpty()
    @Column({nullable: false})
    hometown: string;

    @ManyToOne(() => UsersEntity, user => user.about)
    user: UsersEntity;
}