import { Product } from "@app/products/entities/products.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:'categories'
})
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({length: 50})
    name: string;

    @OneToOne(() => Product, product => product.categories)
    product: Product
}
