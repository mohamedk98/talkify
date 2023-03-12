import { Entity, Column } from "typeorm"
import { Base } from "./base.model"
@Entity()
export class Friend extends Base {
  @Column()
  username: string
  @Column()
  friendId: string


}
