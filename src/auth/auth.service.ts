import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(loginDto: LoginDto): Promise<{ access_token: string }> {
        const user = await this.usersService.findOne(loginDto.email);
        if (user?.password !== loginDto.password) throw new UnauthorizedException();    
        const payload = { sub: user.id, firstName: user.firstName, lastName: user.lastName };
        return { access_token: await this.jwtService.signAsync(payload)};
    }
}
