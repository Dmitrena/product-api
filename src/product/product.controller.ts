import { AccessTokenGuard } from './../common/guards/accessToken.guard';
import { IdValidationPipe } from './../pipes/id-validation.pipe';
import { FindProductDto } from './dto/find-product.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Get(':id')
  async findOne(@Param('id', IdValidationPipe) id: string) {
    return await this.productService.findById(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  async update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productService.update(id, updateProductDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  async remove(@Param('id', IdValidationPipe) id: string) {
    return await this.productService.remove(id);
  }

  @HttpCode(200)
  @Post('find')
  async find(@Body() findProductDto: FindProductDto) {
    return this.productService.findWithReviewsT(findProductDto);
  }
}
