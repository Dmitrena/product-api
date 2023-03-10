import { Module } from '@nestjs/common';
import { TopPageService } from './top-page.service';
import { TopPageController } from './top-page.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPage, TopPageSchema } from './schemas/top-page.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TopPage.name, schema: TopPageSchema }]),
  ],
  controllers: [TopPageController],
  providers: [TopPageService],
})
export class TopPageModule {}
