import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from 'nestjs-typegoose';
import { Ref, ReturnModelType } from '@typegoose/typegoose';
import { Cart } from 'src/models/carts.model';
import { User } from 'src/models/users.model';
import { Product } from 'src/models/products.model';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart)
    private readonly cartModel: ReturnModelType<typeof Cart>,
  ) { }

  async create(createCartDto: CreateCartDto, user) {
    let products_ = createCartDto.products.map(item => ({
      productId: item.productId as unknown as Ref<Product>,
      quantity: item.quantity
    }))
    return await this.cartModel.findOneAndUpdate(
      {
        user: user.id as unknown as Ref<User>
      },
      { products: products_ }, { upsert: true, new: true });
  }

  async findAll(user: any) {
    return await this.cartModel.find({ user: user.id as unknown as Ref<User> })
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} cart`;
  // }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
