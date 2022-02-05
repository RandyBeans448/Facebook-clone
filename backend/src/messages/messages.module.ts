import { Module, Global } from "@nestjs/common";
import { MessagesService } from "./services/messages.services";
import { MessagesEntity } from "./models/messages.entity";

import { TypeOrmModule } from "@nestjs/typeorm";

@Global()
@Module({
    imports: [ 
        TypeOrmModule.forFeature([MessagesEntity])
    ],
    providers: [MessagesService],
    exports: [MessagesService]
})
export class MessagesModule {}