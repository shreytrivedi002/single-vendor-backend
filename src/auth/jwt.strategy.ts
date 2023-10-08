import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './jwt.iterface';
import { User } from 'src/models/users.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UsersService) {
        super({
            secretOrKey: `${process.env.JWT_SECRET}`,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload): Promise<Partial<User>> {
        const { id } = payload;

        const user = await this.userService.getUser({ id });

        if (!user) {
            throw new UnauthorizedException();
        }

        const { _id, contact, name } = user;

        return {
            name,
            _id,
            contact,
        };
    }
}
