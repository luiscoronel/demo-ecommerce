import { Body, Controller, Get, Post, Req, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from '../users/dto/createUser.dto';
import { ApiTags } from '@nestjs/swagger';
import { InterceptorsConsumer } from '@nestjs/core/interceptors';
import { UserLowerCaseInterceptor } from '@app/interceptors/user-lower-case';
import { DateAdderInterceptor } from '@app/interceptors/date-adder.interceptor';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    
    @Post('signin')
    signin(@Body() credentials: LoginUserDto){
        const {email, password} = credentials
        return this.authService.signIn(email, password);
    }

    @Post('signup')
    @UseInterceptors(UserLowerCaseInterceptor)
    signUp(@Body() user: CreateUserDto){
        return this.authService.signUp(user);
    }
    
}
