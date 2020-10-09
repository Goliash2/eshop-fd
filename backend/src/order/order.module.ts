import { Module } from '@nestjs/common';
import {OrderService} from "./order.service";
import { OrderController } from './order.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {AuthModule} from "../auth/auth.module";
import {UserModule} from "../user/user.module";
import {OrderSchema} from "./order.model";

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Order', schema: OrderSchema}]),
    AuthModule,
    UserModule
  ],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService]
})
export class OrderModule {}
