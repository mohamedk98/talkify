import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { SignupDto } from "src/authentication/requests/signup.dto"
import { User } from "src/database/models/user.model"
import { Repository } from "typeorm"

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(User) private readonly userRepoistory: Repository<User>,
  ) {}

  async findOneById (id: string) {
    const user = await this.userRepoistory.findOneBy({ id })

  
    return user
  }

  async findOneByEmail (email: string) {
    const user = await this.userRepoistory.findOneBy({ email })

  

    return user
  }

  async findOneByUsername (username: string) {
    const user = await this.userRepoistory.findOneBy({ username })

  

    return user
  }

  async createUser (signupData: SignupDto) {
    const newUser = this.userRepoistory.create(signupData)

    try {
      await this.userRepoistory.save(newUser)
    } catch (error) {
        console.log(error)
      throw new BadRequestException(
        "Ops,something went wrong. Please try again later",
      )
    }
  }
}
