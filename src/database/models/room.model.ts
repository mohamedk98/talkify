import { Entity, Column, OneToMany } from "typeorm"
import { Base } from "./base.model"
import { Participant } from "./participant.model"
import { RoomMessage } from "./roomMessage.model"

export enum RoomType {
  "public" = "public",
  "private" = "private",
}
@Entity()
export class Room extends Base {
  @Column()
  name: string
  @Column({ enum: RoomType, type: "enum" })
  type: RoomType

  @Column()
  allMessagesAllowed: boolean

  @OneToMany(() => Participant, participant => participant.room)
  participants: Participant[]

  @OneToMany(()=>RoomMessage, roomMessage => roomMessage.room)
  messages:RoomMessage[]
}
