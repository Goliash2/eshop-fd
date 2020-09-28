import {Body, Controller, Get, Post, Param, Patch, Delete} from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserMongo } from './user.model';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { access } from 'fs';
import { UserModule } from './user.module';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get()
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }

    @Get(':id')
    getUser(@Param('id') id: string): Observable<User | Boolean> {
        return this.userService.getUser(id);
    }

    @Post()
    addUser(@Body() user: User): Observable<User | Object> {
        return this.userService.createUser(user).pipe(
            map((user: User) => user),
            catchError(err => of({error: "e1 " + err.message}))
        );
    }

    @Post('login')
    login(@Body() user: User): Observable<Object> {
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return {access_token: jwt};
            })
        )
    }

    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() user: User): Observable<any> {
        return this.userService.updateUser(id, user);
    }
    
    @Delete(':id')
    async deleteUser(@Param('id') usrId: string){
        await this.userService.deleteUser(usrId);
        return null;
    }
}