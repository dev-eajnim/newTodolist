import { IsBooleanString, IsString } from "class-validator"

export class CreateTodolistDto {
    @IsString()
    content: string
     
    @IsBooleanString()
    chk: boolean
}
