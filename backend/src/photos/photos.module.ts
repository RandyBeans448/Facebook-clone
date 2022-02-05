import { Module, Global } from "@nestjs/common";
import { PhotoEntity } from "./models/photos.entity";
import { PhotoService } from "./services/photos.services";
import { TypeOrmModule } from "@nestjs/typeorm";

@Global()
@Module({
    imports: [ 
        TypeOrmModule.forFeature([PhotoEntity])
    ],
    providers: [PhotoService],
    exports: [PhotoService]
})
export class PostsModule {}