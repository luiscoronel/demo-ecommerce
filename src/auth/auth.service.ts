import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../users/users.repository';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userRepository: UsersRepository,
                private readonly jwtService: JwtService,
    ){}

    async signUp(user: Partial<User>){
        const { email, password } = user; 
        
        const foundUser = await this.userRepository.getUserByEmail(email);
        if (foundUser) {
            throw new BadRequestException('Email already exist');
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        if (!hashedPassword) {
            throw new BadRequestException('password could not be hashed');
        }
        return await this.userRepository.addUser({
            ...user, 
            password: hashedPassword 
        });
    }

    async signIn(email: string, password: string){
       const user = await this.userRepository.getUserByEmail(email);
            if (!user) {
                throw new BadRequestException('User not found');
            }
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                throw new BadRequestException('Credenciales incorrectas');
            }
            const payload = { id: user.id, email: user.email, isAdmin: user.isAdmin};
            const token = this.jwtService.sign(payload);

        return {
            menssage: "User Login",
            token,
        };
    }
}
