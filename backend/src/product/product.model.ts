import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    categories: Array,
    sex: String,
    color: String,
    size: Array,
    stock: Number,
    listed: Date,
    pictures: Array,
    price: Object,
    isPublished: Boolean,
    multipleSizes: Boolean,
    manufacturer: String
});

export interface Price {
    price: number;
    date: Date;
}

export interface Size {
    name: string;
    stock: number;
}

export interface Product {
    id?: string;
    name: string;
    description?: string;
    categories?: Array<string>;
    sex?: string;
    color?: string;
    size?: Size[];
    stock: number;
    listed: Date;
    pictures?: Array<string>;
    price: number;
    priceHistory?: Price[];
    isPublished: boolean;
    multipleSizes?: boolean,
    manufacturer?: string;
}

export interface ProductMongo extends mongoose.Document {
    id?: string;
    name: string;
    description?: string;
    categories?: Array<string>;
    sex?: string;
    color?: string;
    size?: Size[];
    stock: number;
    listed: Date;
    pictures?: Array<string>;
    price: number;
    priceHistory?: Price[];
    isPublished: boolean;
    multipleSizes?: boolean,
    manufacturer?: string;
}
