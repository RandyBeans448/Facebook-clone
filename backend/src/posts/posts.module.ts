import { Module, Global } from "@nestjs/common";
import { PostsService } from "./services/posts.services";
import { PostsEntity } from "./models/posts.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Global()
@Module({
    imports: [ 
        TypeOrmModule.forFeature([PostsEntity])
    ],
    providers: [PostsService],
    exports: [PostsService]
})
export class PostsModule {}