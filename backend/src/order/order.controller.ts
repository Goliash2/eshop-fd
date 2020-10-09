import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Request} from '@nestjs/common';
import {OrderService} from "./order.service";
import {Observable, of} from "rxjs";
import {hasRoles} from "../auth/roles.decorators";
import {UserRole} from "../user/user.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RolesGuard} from "../auth/roles.guard";
import {catchError, map} from "rxjs/operators";
import {Order} from "./order.model";

@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
    ) {
    }

    @Get()
    @hasRoles(UserRole.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getAllUserOrders(@Request() req) {
        return this.orderService.getAllUserOrders(req.user);
    }

    @Get(':id')
    @hasRoles(UserRole.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    getOrder(@Param('id') id: string, @Request() req): Observable<Order | boolean> {
        return this.orderService.getOrder(id, req.user);
    }

    @Post()
    @hasRoles(UserRole.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    createOrder(@Body() order: Order): Observable<Order | any> {
        return this.orderService.createOrder(order).pipe(
            map((order: Order) => order),
            catchError(err => of({error: "e1 " + err.message}))
        );
    }

    @Patch(':id')
    @hasRoles(UserRole.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    updateOrder(@Param('id') id: string, @Body() order: Order, @Request() req): Observable<any> {
        return this.orderService.updateOrder(id, order, req.user);
    }

}
