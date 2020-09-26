import {Body, Controller, Get, Post, Param, Patch, Delete} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get()
    async getAllUsers() {
        return await this.userService.getAllUsers();
        // return locNadrazky // .map((nadr) => {id: nadr._id});
    }

    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.userService.getUser(id);
    }

    @Post()
    async addUser(@Body() completeBody: {
        name: string,
        username: string,
        email: string,
    }) {
        const generatedId = await this.userService.createUser(
            completeBody.name,
            completeBody.username,
            completeBody.email
        );
        return { id: generatedId };
    }

    @Patch(':id')
    async updateUser(@Param('id') usrId: string, @Body() completeBody: {
        name: string,
        username: string,
        email: string
    }) {
        await this.userService.updateUser(
            usrId,
            completeBody.name,
            completeBody.username,
            completeBody.email
        );
        return null;
    }

    @Delete(':id')
    async deleteUser(@Param('id') nadrId: string){
        await this.userService.deleteUser(nadrId);
        return null;
    }
}
