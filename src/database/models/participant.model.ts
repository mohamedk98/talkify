import { Entity, Column, ManyToOne } from "typeorm"
import { Base } from "./base.model"
import { Room } from "./room.model"
import { User } from "./user.model"
export enum ParticipantRole {
  "user" = "user",
  "admin" = "admin",
}
@Entity()
export class Participant extends Base {
  @ManyToOne(() => User, user => user.participantIn)
  user: User
  @Column({ enum: ParticipantRole, type: "enum" })
  role: ParticipantRole
  @ManyToOne(() => Room, room => room.participants)
  room: Room
}
