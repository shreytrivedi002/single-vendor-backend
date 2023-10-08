import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from 'src/models/products.model';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [
    TypegooseModule.forFeature([Product]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
