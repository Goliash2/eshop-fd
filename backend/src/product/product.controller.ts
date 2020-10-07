import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {ProductService} from "./product.service";
import {hasRoles} from "../auth/roles.decorators";
import {UserRole} from "../user/user.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RolesGuard} from "../auth/roles.guard";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Product} from "./product.model";

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
    ) {
    }

    @Get()
    async getAllProducts() {
        return this.productService.getAllProducts();
    }

    @Get('man')
    async getAllManProducts() {
        return this.productService.getAllManProducts();
    }

    @Get('woman')
    async getAllWomanProducts() {
        return this.productService.getAllWomanProducts();
    }

    @Get(':id')
    getProduct(@Param('id') id: string): Observable<Product | boolean> {
        return this.productService.getProduct(id);
    }

    @Post()
    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    addProduct(@Body() product: Product): Observable<Product | any> {
        return this.productService.createProduct(product).pipe(
            map((product: Product) => product),
            catchError(err => of({error: "e1 " + err.message}))
        );
    }

    @Patch(':id')
    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    updateProduct(@Param('id') id: string, @Body() product: Product): Observable<any> {
        return this.productService.updateProduct(id, product);
    }

    @Delete(':id')
    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async deleteProduct(@Param('id') prodId: string){
        await this.productService.deleteProduct(prodId);
        return null;
    }
}
