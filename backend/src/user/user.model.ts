import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export const UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    role: String
});

UserSchema.plugin(mongoosePaginate);

export interface User {
    id?: string;
    name: string;
    username: string;
    email: string;
    password?: string;
    role?: string;
}

export interface UserMongo extends mongoose.Document {
    id?: string;
    name: string;
    username: string;
    email: string;
    password?: string;
    role?: string;
}

export enum UserRole {
    ADMIN = 'admin',
    CHIEFEDITOR = 'chiefeditor',
    EDITOR = 'editor',
    USER = 'user'
}
