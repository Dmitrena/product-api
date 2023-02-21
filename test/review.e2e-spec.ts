import { REVIEW_NOT_FOUND } from './../src/constants/review.constants';
import { CreateReviewDto } from './../src/review/dto/create-review.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect, Types } from 'mongoose';

const productId = new Types.ObjectId().toHexString();

const testReviewDto: CreateReviewDto = {
  name: 'Test',
  title: 'Title',
  description: 'Description',
  rating: 4,
  productId: productId,
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/review (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/review')
      .send(testReviewDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id;
        expect(createdId).toBeDefined();
        console.log(body);
        console.log(productId);
      });
  });

  // it('/review/:productId (GET)', async () => {
  //   return request(app.getHttpServer())
  //     .get('/review/' + productId)
  //     .expect(200)
  //     .then((res: request.Response) => {
  //       expect(res.body.length).toBe(1);
  //     });
  // });

  it('/review/:id (DELETE) - success', () => {
    return request(app.getHttpServer())
      .delete('/review/' + createdId)
      .expect(200);
  });

  it('/review/:id (DELETE) - fail', () => {
    return request(app.getHttpServer())
      .delete('/review/' + new Types.ObjectId().toHexString())
      .expect(404, {
        statusCode: 404,
        message: REVIEW_NOT_FOUND,
      });
  });

  afterAll(() => {
    disconnect();
  });
});
