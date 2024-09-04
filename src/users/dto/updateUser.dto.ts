
import {IsNotEmpty, IsString, IsEmail, MinLength, MaxLength, IsStrongPassword, IsNumber, IsOptional, Validate, IsEmpty} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger' 
export class UpdateUserDto {

    @ApiProperty({
        description:'Nombre del usuario',
        example: 'Test User'
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    name: string;

    @ApiProperty({
        description:'Correo Electronico del usuario',
        example: 'miEmail@mail.com'
    })
    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description:'Contraseña del usuario',
        example: 'ElC1mp4d2L4s4Livos!'
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @IsStrongPassword({
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
    password: string;

    @ApiProperty({
        description: 'Domicilio del usuario',
        example: 'Una calle sin numero 4030'
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString() 
    @MinLength(3)
    @MaxLength(80)
    address: string;

    @ApiProperty({
        description: 'Telefono del usuario',
        example: '3507457695'
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    phone: string;

    @ApiProperty({
        description: 'Pais del usuario',
        example: 'Argentina'
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    country: string;
    
    @ApiProperty({
        description: 'Ciudad del usuario',
        example: 'Salta'
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    city: string;
}