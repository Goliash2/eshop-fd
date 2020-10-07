import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    categories: Array,
    sex: String,
    color: Array,
    size: Array,
    stock: Number,
    listed: Date,
    pictures: Array,
    price: Object,
    isPublished: Boolean,
    multipleSizes: Boolean,
    multipleColors: Boolean,
    manufacturer: String
});

export interface Price {
    price: number;
    currency: string;
    currencyShort: string;
    date: Date;
}

export interface Product {
    id?: string;
    name: string;
    description?: string;
    categories?: Array<string>;
    sex?: string;
    color?: Array<string>;
    size?: Array<string>;
    stock: number;
    listed: Date;
    pictures?: Array<string>;
    price: Price[];
    isPublished: boolean;
    multipleSizes?: boolean,
    multipleColors?: boolean,
    manufacturer?: string;
}

export interface ProductMongo extends mongoose.Document {
    id?: string;
    name: string;
    description?: string;
    categories?: Array<string>;
    sex?: string;
    color?: Array<string>;
    size?: Array<string>;
    stock: number;
    listed: Date;
    pictures?: Array<string>;
    price: Price[];
    isPublished: boolean;
    multipleSizes?: boolean,
    multipleColors?: boolean,
    manufacturer?: string;
}
