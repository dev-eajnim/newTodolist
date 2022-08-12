import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Todolist } from './todolist/entities/todolist.entity';
import { TodolistModule } from './todolist/todolist.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // oracle, mysql, mssql, mongodb, sqlite
      host:'localhost', // 접속할 디비 ip
      port:3306, // 접속할 디비 port
      username: 'root', // 접속 계정 이름
      password: '1234', // 비번
      database: 'test', // 데이터 베이스 이름
      synchronize: true, // orm 기능 중 하난데 entity 기반으로 테이블이나 컬럼등을 자동으로 추가/수정함
      logging: true, // 실행되는 쿼리를 콘솔에 보여주는 기능
      entities: [Todolist], // 사용될 엔티티 등록
    })
    ,TodolistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
