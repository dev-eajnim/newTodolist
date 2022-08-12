import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { CreateTodolistDto } from './create-todolist.dto';

export class UpdateTodolistDto extends PartialType(CreateTodolistDto) {
    id: number
}
