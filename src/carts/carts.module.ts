import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Cart } from 'src/models/carts.model';

@Module({
  imports: [TypegooseModule.forFeature([Cart])],
  controllers: [CartsController],
  providers: [CartsService]
})
export class CartsModule { }
