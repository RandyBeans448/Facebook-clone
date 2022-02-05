import { Module, Global } from "@nestjs/common";
import { ConnectionsService } from "./services/connections.service";
import { ConnectionsEntity } from "./models/connections.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Global()
@Module({
    imports: [ 
        TypeOrmModule.forFeature([ConnectionsEntity])
    ],
    providers: [ConnectionsService],
    exports: [ConnectionsService]
})
export class ConnectionsModule {}