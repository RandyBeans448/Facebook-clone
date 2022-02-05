import { Module, Global } from "@nestjs/common";
import { UsersService } from "./services/users.service";
import { UsersController } from "./controllers/users.controller";
import { UsersEntity } from "./models/users.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Global()
@Module({
    imports: [ 
        TypeOrmModule.forFeature([UsersEntity])
    ],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService]
})
export class UsersModule {}