import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignInDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/users.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt.iterface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>,
    private readonly jwtService: JwtService,
  ) { }


  async getAccessToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async signin(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { contact, password } = signInDto;
    const user = await this.userModel.findOne({ contact });
    if (!user) throw new BadRequestException('User not found!');

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid username/password');
    }

    const accessToken = await this.getAccessToken({
      id: user._id as unknown as string,
      contact: user.contact,
      name: user.name,
    });

    return { accessToken };


  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
