import { Test, TestingModule } from '@nestjs/testing';
import { SelfAssesmentController } from './self-assesment.controller';
import { SelfAssesmentService } from './self-assesment.service';

describe('SelfAssesmentController', () => {
  let controller: SelfAssesmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelfAssesmentController],
      providers: [SelfAssesmentService],
    }).compile();

    controller = module.get<SelfAssesmentController>(SelfAssesmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
