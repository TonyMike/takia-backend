import { Injectable, NotFoundException } from '@nestjs/common';
import { fakeUsersDb } from 'fakeDb';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  createUser(user: CreateUserDto) {
    const newUser: CreateUserDto = {
      id: '1',
      role: user.role || 'user',
      email: user.email || '',
      password: user.password || null,
      businessName: user.businessName || '',
      phoneNumber: user.phoneNumber || 0,
      whatsappLink: user.whatsappLink || '',
      instagramLink: user.instagramLink || '',
      twitterLink: user.twitterLink || '',
      fullName: user.fullName || '',
      profilePicture: user.profilePicture || '',
      isGoogleAuth: user.isGoogleAuth || false,
      createdAt: new Date(),
      updatedAt: new Date(),
      products: []
    };
    fakeUsersDb.push(newUser);
    return newUser;
  }
  findAllUsers(): CreateUserDto[] {
    return fakeUsersDb;
  }
  findOneUser(id: string): CreateUserDto | any {
    const user = fakeUsersDb.find(user => user.id === id);

    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }
  findAllUserProducts(id: string): any {
    const user = fakeUsersDb.find(user => user.id === id);
    if (user) {
      return user.products;
    }
    return null;
  }
  updateUser(id: string, updateData: UpdateUserDto): CreateUserDto {
    const user = this.findOneUser(id);
    console.log("🚀 ~ UsersService ~ updateUser ~ user:", user)
    if (user) {
      const updatedUser = { ...user, ...updateData };
      const userIndex = fakeUsersDb.findIndex(user => user.id === id);
      if (userIndex !== -1) {
        fakeUsersDb[userIndex] = updatedUser;
      }
      return updatedUser;
    }
    return undefined;
  }
  deleteUser(id: string): CreateUserDto {
    const userIndex = fakeUsersDb.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      const deletedUser = fakeUsersDb.splice(userIndex, 1)[0];
      return deletedUser;
    }
    return undefined;
  }
}
