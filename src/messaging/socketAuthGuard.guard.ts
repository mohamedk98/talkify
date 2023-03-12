import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from "@nestjs/common"
import { WsException } from "@nestjs/websockets"
import { Socket } from "socket.io"
import { User } from "../database/models/user.model"
import { JwtService } from "@nestjs/jwt"
import { UserService } from "src/user/user.service"

@Injectable()
export class SocketAuthGuard implements CanActivate {
  constructor (
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async canActivate (context: ExecutionContext): Promise<boolean> {
    try {
      const client: Socket = context.switchToWs().getClient<Socket>()
      const authenticationToken: string =
        client.handshake.headers.authorization.split(" ")[1]
      const decodedToken = this.jwtService.verify(authenticationToken, {
        secret: process.env.JWT_SECRET_KEY,
      })
      console.log(decodedToken)
      const user: User = await this.userService.findOneById(decodedToken.id)
      if (!user) {
        throw new WsException("unauthorized")
      }
      context.switchToHttp().getRequest().user = user

      return Boolean(user)
    } catch (err) {
      throw new WsException("unauthorized")
    }
  }
}
