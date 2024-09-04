import { Product } from "../products/entities/products.entity";
import { User } from "../users/entities/user.entity";

export function validateUser(user: Omit<User, 'id' | 'orders'>): boolean {
    const valUser = user.name !== undefined && user.email !== undefined && user.password !== undefined && user.phone !== undefined && user.address !== undefined
    return valUser; 
}

export function validateProduct(product: Product): boolean {
    const valProduct = product.id !== undefined && product.name !== undefined && product.description !== undefined && product.price !== undefined && product.stock !== undefined && product.imgUrl !== undefined
    return valProduct;
}