import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { OrderDetail } from '../../order-details/entities/order-detail.entity';

@Entity({
    name: 'products'
})
export class Product {
    
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column({
        type:'varchar',
        length:50,
        unique: true,
        nullable: false,    
    })
    name: string;
  
    @Column({ length:50})
    description: string;

    @Column({
        type: 'decimal',
        precision:10, 
        scale:2,
        nullable: false,
        })
    price: number;

    @Column({
        type: 'int',
        nullable: false,
    })
    stock: number;

    @Column({
        type: 'text',
        default: '../../utils/sin-foto2.png',
    })
    imgUrl: string

    @ManyToOne(() => Category, (category) => category.product)
    categories: Category
    
    @ManyToMany(() => OrderDetail, orderDetail => orderDetail.products) 
    orderDetail: OrderDetail[]

}
