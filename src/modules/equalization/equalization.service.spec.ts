import { Test, TestingModule } from '@nestjs/testing';
import { EqualizationService } from './equalization.service';

describe('EqualizationService', () => {
  let service: EqualizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EqualizationService],
    }).compile();

    service = module.get<EqualizationService>(EqualizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
