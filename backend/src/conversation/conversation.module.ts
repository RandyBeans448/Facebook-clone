import { Module, Global } from "@nestjs/common";
import { ConversationEntity } from "./models/conversation.entity";
import { ConversationService } from "./services/conversation.services";
import { TypeOrmModule } from "@nestjs/typeorm";

@Global()
@Module({
    imports: [ 
        TypeOrmModule.forFeature([ConversationEntity])
    ],
    providers: [ConversationService],
    exports: [ConversationService]
})
export class ConversationModule {}