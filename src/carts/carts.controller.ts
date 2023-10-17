import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/models/users.model';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) { }

  @Post()
  create(@Body() createCartDto: CreateCartDto, @GetUser() user: Partial<User>) {
    return this.cartsService.create(createCartDto, user);
  }

  @Get()
  findAll(@GetUser() user: Partial<User>) {
    return this.cartsService.findAll(user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: CreateCartDto) {
    return this.cartsService.update(id, updateCartDto);
  }
}
