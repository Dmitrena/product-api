import { PRODUCT_NOT_FOUND } from './../constants/product.constants';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { FindProductDto } from './dto/find-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ProductDocument> {
    return this.productModel.create(createProductDto);
  }

  async findById(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) throw new NotFoundException(PRODUCT_NOT_FOUND);
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, {
        new: true,
      })
      .exec();
    if (!product) throw new NotFoundException(PRODUCT_NOT_FOUND);
    return product;
  }

  async remove(id: string) {
    const product = await this.productModel.findByIdAndDelete(id).exec();
    if (!product) throw new NotFoundException(PRODUCT_NOT_FOUND);
    return product;
  }

  async findWithReviews(findProductDto: FindProductDto) {
    return this.productModel
      .aggregate([
        { $match: { categories: findProductDto.category } },
        { $sort: { _id: 1 } },
        { $limit: findProductDto.limit },
        {
          $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'productId',
            as: 'reviews',
          },
        },
        {
          $addFields: {
            reviewCount: { $size: '$reviews' },
            reviewAvg: { $avg: '$reviews.rating' },
          },
        },
      ])
      .exec();
  }

  async findWithReviewsT(findProductDto: FindProductDto) {
    return this.productModel
      .aggregate([
        { $match: { categories: findProductDto.category } },
        { $sort: { _id: 1 } },
        { $limit: findProductDto.limit },
        {
          $lookup: {
            from: 'reviews',
            let: { productId: '$_id' },
            pipeline: [
              { $match: { $expr: { $eq: ['$productId', '$$productId'] } } },
              { $sort: { createdAt: -1 } },
            ],
            as: 'reviews',
          },
        },
        {
          $addFields: {
            reviewCount: { $size: '$reviews' },
            reviewAvg: { $avg: '$reviews.rating' },
          },
        },
      ])
      .exec();
  }
}
