import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('feed_post')
export class FeedPostEntity {
@PrimaryGeneratedColumn()
id: number;

@Column({ default: '' })
body: string; 

@Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
createdAt: Date;

}