import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductSchema } from "./product.model";
import { AuthModule } from "../auth/auth.module";
import {UserModule} from "../user/user.module";

@Module({
  imports: [
      MongooseModule.forFeature([{name: 'Product', schema: ProductSchema}]),
      AuthModule,
      UserModule
  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService]
})
export class ProductModule {}
