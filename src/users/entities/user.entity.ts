import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../../orders/entities/order.entity";


@Entity({
        name:'users'
})
export class User {
        @PrimaryGeneratedColumn('uuid')
        id: string

        @Column({length: 50, unique: true})
        email: string

        @Column({length:50})
        name: string

        @Column({
                type: 'varchar',
                length:128,
                nullable: false,
        })
        password: string

        @Column()
        address: string

        @Column({
                length: 15,})
        phone: string

        @Column({length:50})
        country: string 
        
        @Column({length: 50})
        city: string 

        @Column({
                default: true,
        })
        isAdmin: boolean

        @OneToMany(() => Order, (order) => order.user)
        orders: Order
}