import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { Repository } from "typeorm";
import * as data from '../utils/data.json';



@Injectable()
export class CategoriesRepository {
    constructor(
        @InjectRepository(Category)
        private readonly categoriesRepository: Repository<Category>,
    ) {}

    async getCategories() {
        return await this.categoriesRepository.find();
    }

    async addCategories(){
        const categoryMap = new Map<string, Category>();

        for (const item of data) {
            if (!categoryMap.has(item.category)) {
                const category = this.categoriesRepository.create({name: item.category});
                await this.categoriesRepository.save(category);
                categoryMap.set(item.category, category);
            }
        }
        return "Categoria agregadas"
    }
}