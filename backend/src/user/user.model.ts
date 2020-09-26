import * as mongoose from 'mongoose';

export interface OpeningHours {
    id: string;
    dayNumber: number;
    from: string;
    till: string;
}

export interface Beer {
    id: string;
    name: string;
    price: number;
    brewery: string;
    size: number;
    updated: string;
}

export interface Comment {
    id: string;
    user: string;
    text: string;
    inserted: string;
}

export interface SocialLink {
    id: string;
    type: string;
    name: string;
    link: string;
}

export interface Image {
    id: string;
    name: string;
    link: string;
}

export const UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
});

export interface User extends mongoose.Document {
    id: string;
    name: string;
    username: string;
    email: string;
}
