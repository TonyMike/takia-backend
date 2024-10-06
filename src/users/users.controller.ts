import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  findAll(): CreateUserDto[] {
    return this.usersService.findAllUsers();
  }
  @Post()
  create(@Body(ValidationPipe) user: CreateUserDto): CreateUserDto {
    return this.usersService.createUser(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string): CreateUserDto {
    return this.usersService.findOneUser(id); 
  }
  @Get(':id/products')
  findAllUserProducts(@Param('id') id: string): any {
    return this.usersService.findAllUserProducts(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: UpdateUserDto): UpdateUserDto {
    return this.usersService.updateUser(id, updateData);
  }
  @Delete(':id')
  delete(@Param('id') id: string): CreateUserDto {
    return this.usersService.deleteUser(id);
  }
}
