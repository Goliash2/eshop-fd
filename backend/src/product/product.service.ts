import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {AuthService} from "../auth/auth.service";
import {Product, ProductMongo} from "./product.model";
import {User, UserMongo} from "../user/user.model";
import {from, Observable, throwError} from "rxjs";
import {catchError, map, switchMap} from "rxjs/operators";

@Injectable()
export class ProductService {
    constructor(
        @InjectModel('Product') private readonly productModel: Model<ProductMongo>,
        private authService: AuthService
    ) {
    }

    createProduct(user: Product): Observable<Product> {
        return this.authService.hashPassword(user.password).pipe(
            switchMap((passwordHash: string) => {
                const newUser = new this.productModel({
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    password: passwordHash,
                    role: user.role
                });
                return from(newUser.save()).pipe(
                    map((user: UserMongo) => {
                        return user._id;
                    })
                )
            })
        )
    }

    getAllUsers(): Observable<Product[]> {
        return from(this.productModel.find().exec()).pipe(
            map((usersM) => {
                const users: User[] = [];
                usersM.forEach((userM: UserMongo) => {
                    const user: User = {
                        'id': userM._id,
                        'name': userM.name,
                        'username': userM.username,
                        'email': userM.email,
                        'role': userM.role
                    };
                    users.push(user);
                });
                return users;
            })
        )
    }

    getUser(usrId: string): Observable<User> {
        return this.findUser(usrId);
    }

    updateUser(id: string, user: User): Observable<User> {
        delete user.email;
        delete user.password;
        delete user.role;
        return from(this.productModel.findByIdAndUpdate(id, user)).pipe(
            switchMap(() => this.findUser(id))
        );
    }

    updateUserAdmin(id: string, user: User): Observable<User> {
        return from(this.productModel.findByIdAndUpdate(id, user)).pipe(
            switchMap(() => this.findUser(id))
        );
    }

    private findUser(usrId: string): Observable<User> {
        return from(this.productModel.findById(usrId).exec()).pipe(
            map((userM: UserMongo) => {
                const user: User = {
                    'id': userM._id,
                    'name': userM.name,
                    'username': userM.username,
                    'email': userM.email,
                    'role': userM.role
                };
                return user;
            }),
            catchError(err => throwError(err))
        );
    }

    async deleteUser(prodId: string) {
        const result = await this.productModel.deleteOne({_id: prodId}).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find the user');
        }
    }
}
