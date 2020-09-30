import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, from } from 'rxjs';
import { User } from "../user/user.model";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService) {}

    generateJwt(user: User): Observable <string> {
        return from(this.jwtService.signAsync({user}));
    }

    hashPassword(password: string): Observable <string> {
        return from(bcrypt.hash(password, 12));
    }

    comparePasswords(newPassword: string, passwordHash: string): Observable <any | boolean> {
        return from(bcrypt.compare(newPassword, passwordHash));
    }
}
