import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {from, Observable} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {Order, OrderMongo} from "./order.model";
import {constants} from "os";

@Injectable()
export class OrderService {
    constructor(
        @InjectModel('Order') private readonly orderModel: Model<OrderMongo>
    ) {
    }

    createOrder(order: Order): Observable<Order> {
        const newOrder = new this.orderModel(order);
        return from(newOrder.save()).pipe(
            map((order: OrderMongo) => {
                console.log(order);
                return order._id;
            })
        )
    }

    getAllUserOrders(user): Observable<Order[]> {
        return from(this.orderModel.find({"userId":user.id}).exec());
    }

    getOrder(ordrId: string, user): Observable<Order> {
        return this.findOrder(ordrId).pipe(
            map(order => {
                if (order.userId === user.id)
                    return order;
                else
                    throw new NotFoundException('Order belongs to other user.');
            })
        );
    }

    updateOrder(id: string, orderNewData: Order, user): Observable<Order> {
        return this.findOrder(id).pipe(
            switchMap(order => {
                if (order.userId === user.id)
                    return from(this.orderModel.findByIdAndUpdate(id, orderNewData)).pipe(
                        switchMap(() => this.findOrder(id))
                    );
                else
                    throw new NotFoundException('Order belongs to other user.');
            })
        );
    }

    private findOrder(ordrId: string): Observable<Order> {
        return from(this.orderModel.findById(ordrId).exec());
    }

    async deleteOrder(ordrId: string) {
        const result = await this.orderModel.deleteOne({_id: ordrId}).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find the user');
        }
    }
}
