import {Injectable, NotFoundException} from '@nestjs/common';
import { User } from './user.model';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from 'mongoose';
import { from } from 'rxjs';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {
    }

    async createUser(
        name: string,
        username: string,
        email: string,
    ) {
        const newUser = new this.userModel({
            name: name, // typescript shortcut allow to just write variable, if it have same name - used below
            username,
            email
        });
        const result = await newUser.save();
        return result.id as string;
        //
    }

    async getAllUsers() {
        const users = await this.userModel.find().exec();
        return users as User[];
    }

    async getUser(usrId: string) {
        return await this.findUser(usrId);
    }

    async updateUser(
        id: string,
        name: string,
        username: string,
        email: string
    ) {
        await this.findUser(id).then((updatedUser) => {
            if (name) {
                updatedUser.name = name;
            }
            if (username) {
                updatedUser.username = username;
            }
            if (email) {
                updatedUser.email = email;
            }
            updatedUser.save();
        });
    }

    private async findUser(usrId: string): Promise<User> {
        let user;
        try {
            user = await this.userModel.findById(usrId).exec();
        } catch (e) {
            throw new NotFoundException('Could not find the pub');
        }
        if (!user) {
            throw new NotFoundException('Could not find the pub');
        }
        return user;
    }

    async deleteUser(nadrId: string) {
        const result = await this.userModel.deleteOne({_id: nadrId}).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find the pub');
        }
    }
}
