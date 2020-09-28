import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String
});

export interface User {
    id?: string;
    name: string;
    username: string;
    email: string;
    password?: string;
}

export interface UserMongo extends mongoose.Document {
    id?: string;
    name: string;
    username: string;
    email: string;
    password?: string;
}
