import { REVIEW_NOT_FOUND } from './../constants/review.constants';
import { CreateReviewDto } from './dto/create-review.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Review, ReviewDocument } from './schemas/review.schema';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  async create(dto: CreateReviewDto): Promise<ReviewDocument> {
    const createdReview = new this.reviewModel({
      ...dto,
      productId: new Types.ObjectId(dto.productId),
    });
    return createdReview.save();
  }
  async delete(id: string): Promise<ReviewDocument | null> {
    const deletedDoc = await this.reviewModel.findByIdAndDelete(id).exec();
    if (!deletedDoc)
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    return deletedDoc;
  }

  async findByProductId(productId: string): Promise<ReviewDocument[]> {
    return this.reviewModel
      .find({ productId: new Types.ObjectId(productId) })
      .exec();
  }

  async deleteByProductId(productId: string) {
    return this.reviewModel
      .deleteMany({
        productId: new Types.ObjectId(productId),
      })
      .exec();
  }
}
