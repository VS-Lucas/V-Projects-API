import { Test, TestingModule } from '@nestjs/testing';
import { CyclesEqualizationController } from './cycles-equalization.controller';

describe('CyclesEqualizationController', () => {
  let controller: CyclesEqualizationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CyclesEqualizationController],
    }).compile();

    controller = module.get<CyclesEqualizationController>(CyclesEqualizationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
