import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Order } from "./entities/order.entity"
import { User } from "../users/entities/user.entity"
import { OrderDetail } from "../order-details/entities/order-detail.entity"
import { Product } from "../products/entities/products.entity"

export class OrdersRepository {
    constructor(@InjectRepository(Order) private orderRepository: Repository<Order>,
                @InjectRepository(User) private userRepository: Repository<User>,
                @InjectRepository(OrderDetail) private orderDetailRepository: Repository<OrderDetail>,
                @InjectRepository(Product) private productsRepository: Repository<Product>,
            ){}

    async addOrder(userId: string, products: string[]) {
            let totalOrder = 0; 
            const user = await this.userRepository.findOneBy({id: userId})

            if (!user) {
                return `User with id ${userId} not found`;
            }

            const order = new Order()    
            order.date = new Date()
            order.user = user;
            
            const productArray: Product[] = [];      
            const newOrder = await this.orderRepository.save(order);

            await Promise.all(products.map(async (element) => {
                
                const product = await this.productsRepository.findOneBy({
                    id: element});
                    
                if (!product) {    
                    return `Product with id ${element} not found`;
                }
                if (product.stock <0 ) {
                    return `Product with id ${element} is out of stock`;
                }

                totalOrder += Number(product.price)
                
                await this.productsRepository.update(
                    { id: element },
                    {stock: product.stock - 1}
                );
                
                productArray.push(product)

                return product;
            }),
        );

        const orderDetail = new OrderDetail()
        
        orderDetail.price = Number(Number(totalOrder).toFixed(2));
        orderDetail.products = productArray
        orderDetail.order = newOrder;
        
        await this.orderDetailRepository.save(orderDetail);

        const newOrderUser =  await this.orderRepository.find({
            where: {id: newOrder.id},
            relations:{
                orderDetail: {
                    products: true
                }
            }
        });
        return newOrderUser;
        
    }

    async getOrder(id: string) {
        const order = await this.orderRepository.findOne({
                where: {id},
                    relations: {
                        orderDetail: {
                            products: true
                }
            }});
        if (!order) {
            return `Order with id ${id} not found`;
        }        
        return order;
    }
}
