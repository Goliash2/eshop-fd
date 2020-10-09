import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
    userId: String,
    orderedProducts: Array,
    status: String,
    paymentMethod: String,
    paid: Boolean,
    comments: Array,
    placedOn: Date,
    totalPrice: Number,
});

export interface Comment {
    text: string;
    user: string;
    date: Date;
}

export interface OrderedSizes {
    sizeName: string;
    quantity: number;
}

export interface OrderedProduct {
    prodId: string;
    orderedSizes: OrderedSizes[];
    unitPrice: number;
}

export interface Order {
    id?: string;
    userId: string;
    orderedProducts: OrderedProduct[];
    status: string;
    paymentMethod?: string;
    paid: boolean;
    comments?: Comment[];
    placedOn: Date;
    totalPrice: number;
}

export interface OrderMongo extends mongoose.Document {
    id?: string;
    userId: string;
    orderedProducts: OrderedProduct[];
    status: string;
    paymentMethod?: string;
    paid: boolean;
    comments?: Comment[];
    placedOn: Date;
    totalPrice: number;
}
