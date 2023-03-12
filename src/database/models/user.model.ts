import { Entity, Column, JoinTable, ManyToMany, OneToMany } from "typeorm"
import { Base } from "./base.model"
import { Participant } from "./participant.model"
@Entity()
export class User extends Base {
  @Column()
  username: string
  @Column()
  firstname: string
  @Column()
  lastname: string
  @Column()
  email: string
  @Column()
  password: string
  @Column({
    nullable: true,
  })
  profileImage: string
  @ManyToMany(() => User, user => user.friends)
  @JoinTable({
    name: "friends",
    joinColumn: {
      name: "userId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "friendId",
      referencedColumnName: "id",
    },
  })
  friends: User[]

  @OneToMany(() => Participant, participant => participant.user)
  participantIn: Participant[]
}
