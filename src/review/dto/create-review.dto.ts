import { IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  // @Length(1, 5)
  rating: number;

  @IsString()
  productId: string;
}
