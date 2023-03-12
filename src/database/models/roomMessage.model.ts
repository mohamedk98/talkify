import { Entity, ManyToOne } from "typeorm"
import { Message } from "./message.model"
import { Room } from "./room.model"

@Entity()
export class RoomMessage extends Message {
  @ManyToOne(() => Room, room => room.messages)
  room: Room
}
