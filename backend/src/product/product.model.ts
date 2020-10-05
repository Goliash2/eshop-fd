import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    role: String
});

export interface Product {
    id?: string;
    name: string;
    username: string;
    email: string;
    password?: string;
    role?: string;
}

export interface ProductMongo extends mongoose.Document {
    id?: string;
    name: string;
    username: string;
    email: string;
    password?: string;
    role?: string;
}
