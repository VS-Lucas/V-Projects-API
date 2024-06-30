import { Test, TestingModule } from '@nestjs/testing';
import { CyclesEqualizationService } from './cycles-equalization.service';

describe('CyclesEqualizationService', () => {
  let service: CyclesEqualizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CyclesEqualizationService],
    }).compile();

    service = module.get<CyclesEqualizationService>(CyclesEqualizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
