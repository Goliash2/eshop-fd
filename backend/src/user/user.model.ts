import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    role: String,
    address: Array
});

export interface User {
    id?: string;
    name: string;
    username: string;
    email: string;
    password?: string;
    role?: string;
    address?: Address[];
}

export interface UserMongo extends mongoose.Document {
    id?: string;
    name: string;
    username: string;
    email: string;
    password?: string;
    role?: string;
    address?: Address[];
}

export interface Address {
    streetAndHouseNumber: string;
    postCode: number;
    town: string;

}

export enum UserRole {
    ADMIN = 'admin',
    CHIEFEDITOR = 'chiefeditor',
    EDITOR = 'editor',
    USER = 'user'
}
