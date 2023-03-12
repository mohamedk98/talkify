import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { UserService } from "src/user/user.service"

/**
 * A JWT strategy that verify and validate the JWT and decode it
 */

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (private userService: UserService) {
    super({
      secretOrKey: process.env.JWT_SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
  }

  async validate (payload: any): Promise<any> {
    const { id } = payload
    const user = await this.userService.findOneById(id)

    if (!user) {
      
    }
    return user
  }
}
