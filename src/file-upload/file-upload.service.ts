 import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRespository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../products/entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
    constructor(private readonly fileUploadRepository: FileUploadRespository,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    ){}

    async uploadImage(file: Express.Multer.File, productId: string){
       const product = await this.productRepository.findOneBy({
        id: productId
       });
       if (!product) {
            throw new NotFoundException('Product not found');
       }

       const response = await this.fileUploadRepository.uploadImage(file);
       if (!response.secure_url) {
            throw new NotFoundException('Error uploading image to Cloudinary');
       }
       await this.productRepository.update(productId, {
        imgUrl: response.secure_url
       });

       const updateProduct = await this.productRepository.findOneBy({
        id: productId,
       });
       return updateProduct;
    }
}
