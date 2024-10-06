import { Injectable } from '@nestjs/common';
import { User } from './@types/types';

@Injectable()
export class AppService {

  private fakeUsers: User[] = [
    { id: "605c72ef9b1e8e001f0a7a01", fullName: "Alice Johnson", username: "alice_j", email: "alice.j@example.com", hobbies: ["reading", "hiking"], age: 28 },
    { id: "605c72ef9b1e8e001f0a7a02", fullName: "Bob Smith", username: "bob_smith", email: "bob.s@example.com", hobbies: ["gaming", "cooking"], age: 34 },
    { id: "605c72ef9b1e8e001f0a7a03", fullName: "Charlie Brown", username: "charlie_b", email: "charlie.b@example.com", hobbies: ["photography", "traveling"], age: 25 },
    { id: "605c72ef9b1e8e001f0a7a04", fullName: "Diana Prince", username: "diana_p", email: "diana.p@example.com", hobbies: ["dancing", "yoga"], age: 30 },
    { id: "605c72ef9b1e8e001f0a7a05", fullName: "Ethan Hunt", username: "ethan_h", email: "ethan.h@example.com", hobbies: ["running", "reading"], age: 32 },
    { id: "605c72ef9b1e8e001f0a7a06", fullName: "Fiona Gallagher", username: "fiona_g", email: "fiona.g@example.com", hobbies: ["painting", "cycling"], age: 27 },
    { id: "605c72ef9b1e8e001f0a7a07", fullName: "George Costanza", username: "george_c", email: "george.c@example.com", hobbies: ["watching TV", "playing chess"], age: 35 },
    { id: "605c72ef9b1e8e001f0a7a08", fullName: "Hannah Baker", username: "hannah_b", email: "hannah.b@example.com", hobbies: ["writing", "baking"], age: 22 },
    { id: "605c72ef9b1e8e001f0a7a09", fullName: "Ian Malcolm", username: "ian_m", email: "ian.m@example.com", hobbies: ["jogging", "science"], age: 45 },
    { id: "605c72ef9b1e8e001f0a7a0a", fullName: "Jessica Jones", username: "jessica_j", email: "jessica.j@example.com", hobbies: ["investigating", "boxing"], age: 29 },
    { id: "605c72ef9b1e8e001f0a7a0b", fullName: "Kevin Hart", username: "kevin_h", email: "kevin.h@example.com", hobbies: ["stand-up comedy", "gaming"], age: 38 },
    { id: "605c72ef9b1e8e001f0a7a0c", fullName: "Laura Croft", username: "laura_c", email: "laura.c@example.com", hobbies: ["archaeology", "exploring"], age: 33 },
    { id: "605c72ef9b1e8e001f0a7a0d", fullName: "Mark Zuckerberg", username: "mark_z", email: "mark.z@example.com", hobbies: ["coding", "entrepreneurship"], age: 39 },
    { id: "605c72ef9b1e8e001f0a7a0e", fullName: "Nina Simone", username: "nina_s", email: "nina.s@example.com", hobbies: ["music", "activism"], age: 31 },
    { id: "605c72ef9b1e8e001f0a7a0f", fullName: "Oscar Wilde", username: "oscar_w", email: "oscar.w@example.com", hobbies: ["literature", "theater"], age: 40 },
    { id: "605c72ef9b1e8e001f0a7a10", fullName: "Paul Atreides", username: "paul_a", email: "paul.a@example.com", hobbies: ["strategizing", "reading"], age: 28 },
    { id: "605c72ef9b1e8e001f0a7a11", fullName: "Quinn Fabray", username: "quinn_f", email: "quinn.f@example.com", hobbies: ["singing", "cheerleading"], age: 24 },
    { id: "605c72ef9b1e8e001f0a7a12", fullName: "Rachel Green", username: "rachel_g", email: "rachel.g@example.com", hobbies: ["fashion", "shopping"], age: 31 },
    { id: "605c72ef9b1e8e001f0a7a13", fullName: "Steve Rogers", username: "steve_r", email: "steve.r@example.com", hobbies: ["fitness", "history"], age: 35 },
    { id: "605c72ef9b1e8e001f0a7a14", fullName: "Tina Fey", username: "tina_f", email: "tina.f@example.com", hobbies: ["writing", "acting"], age: 53 }
  ];

  getUsers(): User[] {
    return this.fakeUsers;
  }
  getUserById(id: string): User | undefined {
    return this.fakeUsers.find(user => user.id === id);
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
    this.fakeUsers.push(newUser);
    return newUser;
  }
  updateUserService(id: string, user: Partial<User>): User {
    const index = this.fakeUsers.findIndex(user => user.id === id);
    if (index !== -1) {
      this.fakeUsers[index] = { ...this.fakeUsers[index], ...user };
      return this.fakeUsers[index];
    }
    return {} as User;
  }
}
