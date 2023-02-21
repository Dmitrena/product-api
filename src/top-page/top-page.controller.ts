import { AccessTokenGuard } from './../common/guards/accessToken.guard';
import { IdValidationPipe } from './../pipes/id-validation.pipe';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TopPageService } from './top-page.service';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { UpdateTopPageDto } from './dto/update-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() createTopPageDto: CreateTopPageDto) {
    return this.topPageService.create(createTopPageDto);
  }

  @Get(':id')
  findById(@Param('id', IdValidationPipe) id: string) {
    return this.topPageService.findById(id);
  }

  @Get('by-alias/:alias')
  findByAlias(@Param('alias') alias: string) {
    return this.topPageService.findByAlias(alias);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTopPageDto: UpdateTopPageDto) {
    return this.topPageService.update(id, updateTopPageDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.topPageService.remove(id);
  }

  @Post('find')
  find(@Body() findTopPageDto: FindTopPageDto) {
    return this.topPageService.findByCategory(findTopPageDto.firstCategory);
  }

  @Get('text-search/:text')
  textSearch(@Param('text') text: string) {
    return this.topPageService.findByText(text);
  }
}
