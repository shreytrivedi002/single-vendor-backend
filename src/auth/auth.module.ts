import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from 'src/models/users.model';
import { forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TypegooseModule.forFeature([User]),
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: `${process.env.JWT_SECRET}`,
        signOptions: {
          expiresIn: '30d',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService,JwtStrategy],
  exports: [AuthService, JwtStrategy, PassportModule]
})
export class AuthModule {}
