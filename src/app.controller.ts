import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { User } from './@types/types';
import { AppService } from './app.service';

@Controller('api/users')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getUsers(): User[] {
    return this.appService.getUsers();
  }
  @Get(':id')
  getUserById(@Param('id') id: string): User | undefined {
    return this.appService.getUserById(id);
  }
  @Post()
  createUser(@Body() user: Partial<User>): User {
    return this.appService.createUserService(user);
  }
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() user: Partial<User>): User {
    return this.appService.updateUserService(id, user);
  }
}
