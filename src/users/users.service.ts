import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  private fakeUsersDb: CreateUserDto[] = [
    {
      id: "6c9e2c3c-bc34-4e75-b9a1-3cf8e0d30d3e",
      role: "admin",
      email: "alice.j@example.com",
      password: "hashedPassword1",
      businessName: "Alice's Adventures",
      phoneNumber: 1234567890,
      whatsappLink: "https://wa.me/1234567890",
      instagramLink: "https://instagram.com/aliceadventures",
      twitterLink: "https://twitter.com/aliceadventures",
      fullName: "Alice Johnson",
      profilePicture: "https://example.com/profiles/alice.jpg",
      isGoogleAuth: false,
      createdAt: new Date("2024-01-01T10:00:00Z"),
      updatedAt: new Date("2024-01-02T10:00:00Z"),
      products: []
    },
    {
      id: "ff2e69e3-1e1a-4e8e-a3c4-7b58c2e3a6e1",
      role: "user",
      email: "bob.s@example.com",
      password: "hashedPassword2",
      businessName: "Bob's Burgers",
      phoneNumber: 2345678901,
      whatsappLink: "https://wa.me/2345678901",
      instagramLink: "https://instagram.com/bobsburgers",
      twitterLink: "https://twitter.com/bobsburgers",
      fullName: "Bob Smith",
      profilePicture: "https://example.com/profiles/bob.jpg",
      isGoogleAuth: true,
      createdAt: new Date("2024-01-01T11:00:00Z"),
      updatedAt: new Date("2024-01-02T11:00:00Z"),
      products: []
    },
    {
      id: "a1f48de7-3d9b-4d1f-9c1b-2c453d3548f2",
      role: "user",
      email: "charlie.b@example.com",
      password: "hashedPassword3",
      businessName: "Charlie's Chocolate Factory",
      phoneNumber: 3456789012,
      whatsappLink: "https://wa.me/3456789012",
      instagramLink: "https://instagram.com/charlieschocolate",
      twitterLink: "https://twitter.com/charlieschocolate",
      fullName: "Charlie Brown",
      profilePicture: "https://example.com/profiles/charlie.jpg",
      isGoogleAuth: false,
      createdAt: new Date("2024-01-01T12:00:00Z"),
      updatedAt: new Date("2024-01-02T12:00:00Z"),
      products: []
    },
    {
      id: "2e6c6a6d-8c5e-4e8f-a9d7-bf0be81d75b8",
      role: "user",
      email: "diana.p@example.com",
      password: "hashedPassword4",
      businessName: "Diana's Designs",
      phoneNumber: 4567890123,
      whatsappLink: "https://wa.me/4567890123",
      instagramLink: "https://instagram.com/dianasdesigns",
      twitterLink: "https://twitter.com/dianasdesigns",
      fullName: "Diana Prince",
      profilePicture: "https://example.com/profiles/diana.jpg",
      isGoogleAuth: true,
      createdAt: new Date("2024-01-01T13:00:00Z"),
      updatedAt: new Date("2024-01-02T13:00:00Z"),
      products: []
    },
    {
      id: "0f1a9e1e-9f0e-4045-878c-5e2d3967ef9d",
      role: "user",
      email: "ethan.h@example.com",
      password: "hashedPassword5",
      businessName: "Ethan's Electronics",
      phoneNumber: 5678901234,
      whatsappLink: "https://wa.me/5678901234",
      instagramLink: "https://instagram.com/ethanselectronics",
      twitterLink: "https://twitter.com/ethanselectronics",
      fullName: "Ethan Hunt",
      profilePicture: "https://example.com/profiles/ethan.jpg",
      isGoogleAuth: false,
      createdAt: new Date("2024-01-01T14:00:00Z"),
      updatedAt: new Date("2024-01-02T14:00:00Z"),
      products: []
    },
    // Add more users as needed
  ];



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
    this.fakeUsersDb.push(newUser);
    return newUser;
  }
  findAllUsers(): CreateUserDto[] {
    return this.fakeUsersDb;
  }
  findOneUser(id: string): CreateUserDto | any {
    const user = this.fakeUsersDb.find(user => user.id === id);

    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }
  findAllUserProducts(id: string): any {
    const user = this.fakeUsersDb.find(user => user.id === id);
    if (user) {
      return user.products;
    }
    return null;
  }
  updateUser(id: string, updateData: UpdateUserDto): CreateUserDto {
    const user = this.findOneUser(id);
    if (user) {
      const updatedUser = { ...user, ...updateData };
      const userIndex = this.fakeUsersDb.findIndex(user => user.id === id);
      if (userIndex !== -1) {
        this.fakeUsersDb[userIndex] = updatedUser;
      }
      return updatedUser;
    }
    return undefined;
  }
  deleteUser(id: string): CreateUserDto {
    const userIndex = this.fakeUsersDb.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      const deletedUser = this.fakeUsersDb.splice(userIndex, 1)[0];
      return deletedUser;
    }
    return undefined;
  }
}
