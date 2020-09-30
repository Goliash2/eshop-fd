import {Body, Controller, Get, Post, Param, Patch, Delete} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get()
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(':id')
    getUser(@Param('id') id: string): Observable<User | boolean> {
        return this.userService.getUser(id);
    }

    @Post()
    addUser(@Body() user: User): Observable<User | any> {
        return this.userService.createUser(user).pipe(
            map((user: User) => user),
            catchError(err => of({error: "e1 " + err.message}))
        );
    }

    @Post('login')
    login(@Body() user: User): Observable<any> {
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
