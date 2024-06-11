import { Test, TestingModule } from '@nestjs/testing';
import { SelfAssesmentService } from './self-assesment.service';

describe('SelfAssesmentService', () => {
  let service: SelfAssesmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelfAssesmentService],
    }).compile();

    service = module.get<SelfAssesmentService>(SelfAssesmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
