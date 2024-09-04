import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { OrderDetail } from "../../order-details/entities/order-detail.entity";

@Entity({
    name: 'orders'
})
export class Order {
    
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column()
    date: Date
    
    @OneToOne(() => OrderDetail, orderDetail => orderDetail.order)
    @JoinColumn()
    orderDetail: OrderDetail

    @ManyToOne(() => User, user => user.orders)
    @JoinColumn({name: 'user_id'})
    user: User
    
}
