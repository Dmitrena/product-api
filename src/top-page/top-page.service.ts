import { PAGE_NOT_FOUND } from './../constants/top-page.constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { UpdateTopPageDto } from './dto/update-top-page.dto';
import {
  TopPage,
  TopPageDocument,
  TopLevelCategory,
} from './schemas/top-page.schema';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPage.name) private topPageModel: Model<TopPageDocument>,
  ) {}
  async create(createTopPageDto: CreateTopPageDto) {
    return this.topPageModel.create(createTopPageDto);
  }

  async findById(id: string) {
    const page = await this.topPageModel.findById(id).exec();
    if (!page) throw new NotFoundException(PAGE_NOT_FOUND);
    return page;
  }

  async findByAlias(alias: string) {
    return await this.topPageModel.findOne({ alias }).exec();
  }

  async findByCategory(firstCategory: TopLevelCategory) {
    const page = await this.topPageModel
      .aggregate([
        {
          $match: { firstCategory },
        },
        {
          $group: {
            _id: { secondCategory: '$secondCategory' },
            pages: { $push: { alias: '$alias', title: '$title' } },
          },
        },
      ])
      .exec();
    if (!page) throw new NotFoundException(PAGE_NOT_FOUND);
    return page;
  }

  async findByText(text: string) {
    return await this.topPageModel.find({
      $text: { $search: text, $caseSensitive: false },
    });
  }

  async update(id: string, updateTopPageDto: UpdateTopPageDto) {
    const page = await this.topPageModel
      .findByIdAndUpdate(id, updateTopPageDto, { new: true })
      .exec();
    if (!page) throw new NotFoundException(PAGE_NOT_FOUND);
    return page;
  }

  async remove(id: string) {
    const page = await this.topPageModel.findByIdAndDelete(id).exec();
    if (!page) throw new NotFoundException(PAGE_NOT_FOUND);
    return page;
  }
}
