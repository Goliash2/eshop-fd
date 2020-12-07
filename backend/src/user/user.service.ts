import {Injectable, NotFoundException} from '@nestjs/common';
import {User, UserMongo} from './user.model';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from 'mongoose';
import {from, Observable, throwError} from 'rxjs';
import {map, switchMap, catchError} from 'rxjs/operators';
import {AuthService} from "../auth/auth.service";

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserMongo>,
        private authService: AuthService
    ) {
    }

    createUser(user: User): Observable<User> {
        return this.authService.hashPassword(user.password).pipe(
            switchMap((passwordHash: string) => {
                const newUser = new this.userModel({
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

    getAllUsers(): Observable<User[]> {
        return from(this.userModel.find().exec()).pipe(
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
        return from(this.userModel.findByIdAndUpdate(id, user)).pipe(
            switchMap(() => this.findUser(id))
        );
    }

    updateUserAdmin(id: string, user: User): Observable<User> {
        return from(this.userModel.findByIdAndUpdate(id, user)).pipe(
            switchMap(() => this.findUser(id))
        );
    }

    private findUser(usrId: string): Observable<User> {
        return from(this.userModel.findById(usrId).exec()).pipe(
            map((userM: UserMongo) => {
                const user: User = {
                    'id': userM._id,
                    'name': userM.name,
                    'username': userM.username,
                    'email': userM.email,
                    'role': userM.role,
                    'address': userM.address
                };
                return user;
            }),
            catchError(err => throwError(err))
        );
    }

    async deleteUser(usrId: string) {
        const result = await this.userModel.deleteOne({_id: usrId}).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find the user');
        }
    }

    login(user: User): Observable<string> {
        return this.validateUser(user.email, user.password).pipe(
            switchMap((user: User) => {
                if (user) {
                    return this.authService.generateJwt(user).pipe(map(jwt => jwt));
                } else {
                    return 'Wrong email or password.'
                }
            })
        )
    }

    validateUser(email: string, password: string): Observable<User> {
        return this.findByEmail(email).pipe(
            switchMap((userM: UserMongo) => this.authService.comparePasswords(password, userM.password).pipe(
                map((match: boolean) => {
                    if (match) {
                        const user: User = {
                            'id': userM._id,
                            'name': userM.name,
                            'username': userM.username,
                            'email': userM.email,
                            'role': userM.role
                        };
                        return user;
                    } else {
                        throw Error;
                    }
                })
            ))
        )
    }

    findByEmail(email: string): Observable<User> {
        return from(this.userModel.findOne({email}).exec());
    }
}
