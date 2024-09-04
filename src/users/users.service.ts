import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async createUser(newUser: Partial<User>) {
    return await this.usersRepository.addUser(newUser);
  }
  
  async getAllUsers(page: number, limit: number) {
    return await this.usersRepository.getUsers(page, limit);
  }

 getUserById(id: string) {
    return this.usersRepository.getUserById(id);
  }

  async updateUser(id: string, user: Partial<User>) {
    return this.usersRepository.updateUser(id, user);
  }

  async deleteUser(id: string) {
    await this.usersRepository.deleteUser(id);
  }

  async getUserByEmail(email: string) {
    const foundUserEmail = this.usersRepository.getUserByEmail(email);
    if (!foundUserEmail) {
      throw new NotFoundException(`Email ${email} not found`)
    }
    return foundUserEmail;
  }
}
