import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Product, ProductMongo} from "./product.model";
import {from, Observable} from "rxjs";
import {map, switchMap} from "rxjs/operators";

@Injectable()
export class ProductService {
    constructor(
        @InjectModel('Product') private readonly productModel: Model<ProductMongo>
    ) {
    }

    createProduct(product: Product): Observable<Product> {
        const newProduct = new this.productModel(product);
        return from(newProduct.save()).pipe(
            map((product: ProductMongo) => {
                console.log(product);
                return product._id;
            })
        )
    }

    getAllProducts(): Observable<Product[]> {
        return from(this.productModel.find().exec());
    }

    getOtherProducts(): Observable<Product[]> {
        return from(this.productModel.find({"sex": { $not: /(M|F)/}}).exec());
    }

    getAllManProducts(): Observable<Product[]> {
        return from(this.productModel.find({"sex":"M"}).exec());
    }

    getAllWomanProducts(): Observable<Product[]> {
        return from(this.productModel.find({"sex":"F"}).exec());
    }

    getProduct(prodId: string): Observable<Product> {
        return this.findProduct(prodId);
    }

    updateProduct(id: string, product: Product): Observable<Product> {
        return from(this.productModel.findByIdAndUpdate(id, product)).pipe(
            switchMap(() => this.findProduct(id))
        );
    }

    private findProduct(prodId: string): Observable<Product> {
        return from(this.productModel.findById(prodId).exec());
    }

    async deleteProduct(prodId: string) {
        const result = await this.productModel.deleteOne({_id: prodId}).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find the user');
        }
    }
}
