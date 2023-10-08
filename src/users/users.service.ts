import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from 'nestjs-typegoose';
import { User } from 'src/models/users.model';
import { mongoose, ReturnModelType } from '@typegoose/typegoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>,
  ) { }
  async create(createUserDto: CreateUserDto) {
    const foundUser = await this.userModel.find({ contact: createUserDto.contact });
    if (foundUser.length) {
      throw new BadRequestException('User already exists. Please login')
    }
    const hash = await bcrypt.hashSync(createUserDto.password, 10);
    return hash
      ? await this.userModel.create({ ...createUserDto, password: hash }) :
      "hash not generated";
  }

  findAll() {
    return `This action returns all users`;
  }

  async getUser({ id }) {
    return await this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
