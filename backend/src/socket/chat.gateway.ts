import { Logger } from "@nestjs/common";
import { WsResponse, ConnectedSocket, MessageBody, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { MessagesEntity } from "src/messages/models/messages.entity";

@WebSocketGateway({path: 'chatroom', namespace: '/chat'})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() wss: Server;

    private logger: Logger = new Logger('ChatGateway');

    afterInit(server: Server) {
        this.logger.log('Initalized');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...ags: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    @SubscribeMessage('messageToServer')
        handleMessage(client: Socket, message: { sender: number, room: string, message: MessagesEntity }){
            this.wss.to(message.room).emit('chatToClient', message);
        }
    
    @SubscribeMessage('joinRoom')    
        handleJoinRoom(client: Socket, room: string) {
            client.join(room);
            client.emit('Joined the chat room', room);
        }    
    
    @SubscribeMessage('leaveRoom')    
        handleLeaveRoom(client: Socket, room: string) {
            client.leave(room);
            client.emit('Left the chat room', room);
        }
    
        
        
}