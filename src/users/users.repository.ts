import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>){}

  async getUsers(page: number, limit: number){
    
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;
    const users =  await this.usersRepository.find();
    users.slice(skip, skip + limitNumber);
   
    return users.map(({ password, isAdmin, ...filteredUserData }) => filteredUserData);
  }

  async getUserById(id: string) {
    
    const user = await this.usersRepository.findOne({
      where: { id },
        relations: {
            orders: true
        },
    });
    
    if (!user) {
      throw new NotFoundException(`User id ${id} not found`)
    }
    const { password, isAdmin, ...filteredUserData } = user;
    return filteredUserData;
  }

  async addUser(user: Partial<User>) {
    
    const newUser = await this.usersRepository.save(user);
    const dbUser = await this.usersRepository.findOneBy({ id: newUser.id});

    const { password, isAdmin, ...filteredUserData } = dbUser;
    return filteredUserData;
  }

  async updateUser(id: string, user: Partial<User>) {
    const existingUser = await this.usersRepository.findOne({ where:  { id } } );
    if (!existingUser) {
      return null;
    }
    Object.assign(existingUser, user);
    return await this.usersRepository.save(existingUser);
  }

  async deleteUser(id: string){
    const user = await this.usersRepository.findOneBy({ id });
    this.usersRepository.remove(user);
    const { password, isAdmin, ...filteredUserData } = user;
    return filteredUserData;
  }

  async getUserByEmail(email: string){
    const foundUser = await this.usersRepository.findOne({ where:  { email } } );
    return foundUser;
  }
}
