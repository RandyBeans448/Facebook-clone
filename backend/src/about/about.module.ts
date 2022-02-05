import { Module, Global } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";

import { AboutEntity } from "./models/about.entity";
import { AboutService } from "./services/about.services";

@Global()
@Module({
    imports: [ 
        TypeOrmModule.forFeature([AboutEntity])
    ],
    providers: [AboutService],
    exports: [AboutService]
})
export class AboutModule {}
