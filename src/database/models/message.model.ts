import { Entity, Column } from "typeorm"
import { Base } from "./base.model"

export enum MessageType {
  "text" = "text",
  "image" = "image",
  "sticker" = "sticker",
  "record" = "record",
}
@Entity()
export class Message extends Base {
  @Column()
  senderId: string
  @Column()
  receiverId: string
  @Column()
  message: string
  @Column({ enum: MessageType, type: "enum" })
  type: MessageType
}
