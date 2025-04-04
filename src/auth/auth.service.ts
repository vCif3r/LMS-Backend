import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(loginDto: LoginDto): Promise<{ access_token: string }> {
        const user = await this.usersService.findOneByEmail(loginDto.email);
        if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user.id, firstName: user.firstName, lastName: user.lastName, role: user.role.name };

        const access_token = await this.jwtService.signAsync(payload);
        return { access_token };
    }
}
