import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateTodolistDto } from './dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto';
import { Todolist } from './entities/todolist.entity';

@Injectable()
export class TodolistService {
  constructor(
    @InjectRepository(Todolist)
    private todoRepository: Repository<Todolist>
  ) { }

  create(createTodolistDto: CreateTodolistDto) {
    const todo = this.todoRepository.create(createTodolistDto);
    return this.todoRepository.save(todo);
  }

  async findAll(): Promise<Todolist[]> {
    return this.todoRepository.find();
  }

  findOne(id: number) {
    return this.todoRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTodolistDto: UpdateTodolistDto) {
    let todo = await this.findOne(id)
    if (!todo) throw new NotFoundException()
    todo = { ...todo, ...updateTodolistDto }
    return this.todoRepository.save(todo);
  }

  async toggle(id: number) { //: Promise<{chk:boolean}>
    let todo = await this.todoRepository.findOne({ where: { id } });
    todo={
      ...todo,
      chk : !todo.chk
    }
    return this.todoRepository.save(todo);
  }

  async remove(id: number) {
    let todo = await this.findOne(id)
    if (!todo) throw new NotFoundException()
    return this.todoRepository.remove(todo);
  }
}
