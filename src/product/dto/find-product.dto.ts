import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FindProductDto {
  @IsString()
  @IsOptional()
  category?: string;

  @IsNumber()
  @IsOptional()
  limit?: number;
}
