import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Todolist {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    content : string

    @Column()
    chk : boolean
}