import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConnectionsModule } from './connections/connections.module';
import { PostsModule } from './posts/posts.module';
import { ChatGateway } from './socket/chat.gateway';
import { ConversationModule } from './conversation/conversation.module';
import { MessagesModule } from './messages/messages.module';
import { PhotoEntity } from './photos/models/photos.entity';
import { AboutEntity } from './about/models/about.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      entities: [
        UsersModule,
        AuthModule,
        AboutEntity,
        PostsModule,
        PhotoEntity,
        ConnectionsModule,
        ConversationModule,
        MessagesModule]
    }),
    UsersModule,
    AuthModule,
    AboutEntity,
    PostsModule,
    PhotoEntity,
    ConnectionsModule,
    ConversationModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
