import { Controller, Get, Req, UseGuards } from "@nestjs/common"
import { FriendsService } from "./friends.service"
import { AuthGuard } from "@nestjs/passport"

@UseGuards(AuthGuard("jwt"))
@Controller("friends")
export class FriendsController {
  constructor (private readonly friendsService: FriendsService) {}

  @Get()
  async getAllFriends (@Req() request: any) {
    return await this.friendsService.getAllFriends(request.user.id)
  }
}
