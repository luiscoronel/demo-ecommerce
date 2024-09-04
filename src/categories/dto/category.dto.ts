import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    
    @ApiProperty({
        description: 'Este campo es del nombre de la Categoria, debe ser un string, no puede estar vacio',
        example: 'Electronica',
    })
    @IsNotEmpty()
    @IsString()
    name: string
}
