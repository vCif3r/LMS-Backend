import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(), 
    JwtModule.register({
      global: true,
      secret:  process.env.JWT_SECRET,
      signOptions: { expiresIn: '12h' },
    }),

  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService
  ],
  exports: [AuthService],
})
export class AuthModule { }
