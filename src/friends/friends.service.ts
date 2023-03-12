import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "src/database/models/user.model"
import { Repository } from "typeorm"

@Injectable()
export class FriendsService {
  constructor (
    @InjectRepository(User)
    private readonly friendsRepository: Repository<User>,
  ) {}

  async getAllFriends (userId: string) {
    const user = await this.friendsRepository.findOne({
      relations: { friends: true },
      where: { id: userId },
      select: { friends: { username: true, id: true } },
    })
    return {friends:user.friends}
  }
}
