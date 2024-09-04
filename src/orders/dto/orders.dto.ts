import { Product } from "@app/products/entities/products.entity";
import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateOrderDto {

    @ApiProperty({
        description: 'Este campo de User es obligatorio para generar la Order de la compra, no puede estar vacio',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsNotEmpty()
    @IsUUID()
    user: string

    @ApiProperty({
        description: 'Este campo de Products es obligatorio para generar la Orden de productos, no puede estar vacio',
        example: '[{"id":"123e4567-e89b-12d3-a456-426614174777"}]',
    })
    @IsNotEmpty()
    @ArrayNotEmpty()
    @IsArray()
    products: Partial<Product[]>
}
