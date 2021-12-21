import { BeforeInsert, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  firstName: string;

  @Column({nullable: false})
  lastName: string;

  @Column({nullable: false})
  emailAddress: string;

  @Column({nullable: false})
  password: string;

  @Column({nullable: true})
  image: string;

  @Column({nullable: true})
  background: string;

  @Column({ nullable: true })
  jobTile: string;

  @Column({ nullable: true })
  about: string;

  @Column("text", { array: true, nullable: true })
  skills: string[];

  @Column("text", { array: true, nullable: true })
  connections: string[];

  @Column("text", { array: true, nullable: true })
  experience: string[];

  @Column("text", { array: true, nullable: true })
  education: string[];
}