import {IsNotEmpty, IsString, IsEmail, MinLength, MaxLength, IsStrongPassword, IsNumber, IsOptional, Validate, IsEmpty} from 'class-validator';
import { ApiHideProperty, ApiProperty, PickType } from '@nestjs/swagger' 
import { MatchPassword } from '@app/decorators/matchPassword.decorator';

export class CreateUserDto {

    /**
     * Debe ser un string entre 3 y 80 caracteres
     * @example "Test User"
     */
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    name: string;

    /**
     * No debe ser un string vacio 
     * @example "miemail@mail.com"
     */
    @IsNotEmpty()
    @IsEmail()
    email: string;

    /**
     * Debe ser un string entre 8 y 50 caracteres
     * @example "ElC1mp4d2L4s4Livos!"
     */
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(50)
    @IsStrongPassword({
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
    password: string;

    /**
     * Debe ser el mismo password ingresado anteriormente
     * @example "ElC1mp4d2L4s4Livos!"
     */
    @IsNotEmpty()
    @Validate(MatchPassword, ['password'])
    confirmPassword: string

    /**
     * Debe ser un string entre 8 y 80 caracteres
     * @example "Una calle sin numero 4030"
     */
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(80)
    address: string;

    /** 
     * Debe ser un string y no puedo estar vacio
     * @example "3507457695"
    */
    @IsNotEmpty()
    @IsString()
    phone: string;

    /** 
     * Debe ser un string entre 4 y 20 caracteres
     * @example "Brasil"
    */
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    country: string;
    
    /** 
     * Debe ser un string entre 5 y 20 caracteres
     * @example "Porto Alegre"
    */
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    city: string;

    @ApiHideProperty()
    @IsEmpty()
    isAdmin?: boolean;
}



export class LoginUserDto extends PickType(CreateUserDto, [
    'email',
    'password'
]){}