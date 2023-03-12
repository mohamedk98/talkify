import { Req, UseGuards } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from "@nestjs/websockets"
import { Server, Socket } from "socket.io"
import { SocketAuthGuard } from "./socketAuthGuard.guard"
import { JwtService } from "@nestjs/jwt"
import { UserService } from "src/user/user.service"
import { User } from "src/database/models/user.model"

@UseGuards(SocketAuthGuard)
@WebSocketGateway({ cors: { origin: "http://localhost:4200" } })
export class MessagingGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor (
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  @WebSocketServer()
  io: Server

  users = []

  async handleConnection (client: Socket, ...args: any[]) {
    try {
      const authenticationToken: string =
        client.handshake.headers.authorization.split(" ")[1]
      const decodedToken = this.jwtService.verify(authenticationToken, {
        secret: process.env.JWT_SECRET_KEY,
      })
      if (!decodedToken) {
        client.disconnect()
   
      }
      const user: User = await this.userService.findOneById(decodedToken.id)
      if (!user) {
        client.disconnect()
   
      }

      const userId = client.handshake.auth.userId
      console.log(
        `User with ID ${client.handshake.auth.userId} has been connected`,
      )
      client.emit("session", userId)
    } catch (err) {
      client.disconnect()
 
    }
  }

  handleDisconnect (client: Socket) {
    console.log(
      `User with ID ${client.handshake.auth.userId} has been disconnected`,
    )
  }

  @SubscribeMessage("sendMessage")
  async sendMessage (
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: any,
  ) {
    console.log(body)
    socket.emit("recieveMessage", body.message)
    // socket.to(body.to).emit("recieveMessage", body.message)
  }
}
