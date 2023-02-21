import { IdValidationPipe } from './../pipes/id-validation.pipe';
import { CreateReviewDto } from './dto/create-review.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    return this.reviewService.delete(id);
  }

  @Get('byProduct/:productId')
  async getByProductId(
    @Param('productId', IdValidationPipe) productId: string,
  ) {
    return this.reviewService.findByProductId(productId);
  }
}
