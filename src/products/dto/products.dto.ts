import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";


export class CreateProductDto {
   
    @ApiProperty({
        description: 'Este campo es obligatorio y debe ser un string de 5 a 50 caracteres maximo',
        example: 'monitor',
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(50)
    name: string;

    @ApiProperty({
        description: 'Este campo es obligatorio y debe ser un string de 10 a 50 caracteres maximo',
        example: 'The best monitor in the world',
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    @MaxLength(50)
    description: string;

    @ApiProperty({
        description: 'Este campo es obligatorio y debe ser un numero',
        example: 199.99,
    })
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty({
        description: 'Este campo es obligatorio y debe ser un numero',
        example: 10,
    })
    @IsNotEmpty()
    @IsNumber()
    stock: number;

    @ApiProperty({
        description: 'Este campo es obligatorio y debe ser un string',
        example: 'https://images.acer.com/is/image/acerv20/Acer-Aspire-5-15-6-Inch-Intel-Core-i5-1135G7-15-6-Inch-1366x768-Black.jpg',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(128)
    imgUrl: string; 
}