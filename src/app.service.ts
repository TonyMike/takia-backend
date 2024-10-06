import { Injectable } from '@nestjs/common';
import { fakeUsers } from 'fakeDb';
import { User } from './@types/types';

@Injectable()
export class AppService {
  getUsers(): User[] {
    return fakeUsers;
  }
  getUserById(id: string): User | undefined {
    return fakeUsers.find(user => user.id === id);
  }
  createUserService(user: Partial<User>): User {
    const newUser: User = {
      id: Date.now().toString(),
      fullName: user.fullName,
      username: user.username || '',
      email: user.email || '',
      hobbies: user.hobbies || [],
      age: user.age || 0,
    };
    fakeUsers.push(newUser);
    return newUser;
  }
  updateUserService(id: string, user: Partial<User>): User {
    const index = fakeUsers.findIndex(user => user.id === id);
    if (index !== -1) {
      fakeUsers[index] = { ...fakeUsers[index], ...user };
      return fakeUsers[index];
    }
    return {} as User;
  }
}
