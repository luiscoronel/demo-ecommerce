import { Column, Entity, IsNull, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../../orders/entities/order.entity";
import { Product } from "../../products/entities/products.entity";
import { IsNotEmpty } from "class-validator";

@Entity({
    name: 'orderDetail'
})
export class OrderDetail {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @IsNotEmpty()
    @Column('decimal', {precision:10, scale: 2})
    price: number;

    @OneToOne(() => Order, order => order.orderDetail)
    order: Order;

    @ManyToMany(() => Product, product => product.orderDetail)
    @JoinTable({
        name: 'order_products',
        joinColumn: { name: 'order_detail_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' }
    })
    products: Product[];
} 
