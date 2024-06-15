import { Test, TestingModule } from '@nestjs/testing';
import { EqualizationController } from './equalization.controller';

describe('EqualizationController', () => {
  let controller: EqualizationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EqualizationController],
    }).compile();

    controller = module.get<EqualizationController>(EqualizationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
