import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from 'nestjs-typegoose';
import { Product } from 'src/models/products.model';
import { mongoose, ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: ReturnModelType<typeof Product>,
  ) { }
  async create(createProductDto: CreateProductDto) {
    const foundProduct = await this.productModel.find({ contact: createProductDto.title });

    if (foundProduct.length) {
      throw new BadRequestException('Product already exists.')
    }
    return await this.productModel.create({ ...createProductDto}) 
  }


  async findAll() {
    const allProducts = await this.productModel.find().exec();
    return allProducts;
  }

  async findOne(id: number) {
    return await this.productModel.findById(id)
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const existingProduct = await this.productModel.findById(id);

  if (!existingProduct) {
    throw new BadRequestException(`Product with id ${id} not found.`);
    return 
  }
  existingProduct.title = updateProductDto.title !== undefined ? updateProductDto.title : existingProduct.title;
  existingProduct.description = updateProductDto.description !== undefined ? updateProductDto.description : existingProduct.description;
  existingProduct.images = updateProductDto.images !== undefined ? updateProductDto.images : existingProduct.images;
  existingProduct.price = updateProductDto.price !== undefined ? updateProductDto.price : existingProduct.price;
  existingProduct.location = updateProductDto.location !== undefined ? updateProductDto.location : existingProduct.location;
  existingProduct.discount = updateProductDto.discount !== undefined ? updateProductDto.discount : existingProduct.discount;
  existingProduct.rating = updateProductDto.rating !== undefined ? updateProductDto.rating : existingProduct.rating;
  existingProduct.inventoryCount = updateProductDto.inventoryCount !== undefined ? updateProductDto.inventoryCount : existingProduct.inventoryCount;
  existingProduct.salesCount = updateProductDto.salesCount !== undefined ? updateProductDto.salesCount : existingProduct.salesCount;
  const updatedProduct = await existingProduct.save();

  return updatedProduct;
  }

  async remove(id: string) {
    const deletedProduct = await this.productModel.findByIdAndDelete(id);

  if (!deletedProduct) {
    throw new BadRequestException(`Product with id ${id} not found.`);
  }

  return `Product with id ${id} has been deleted successfully.`;
  }
}
