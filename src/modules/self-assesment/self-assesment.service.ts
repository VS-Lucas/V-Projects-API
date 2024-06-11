import { Injectable } from '@nestjs/common';
import { CreateSelfAssesmentDto } from './dto/create-self-assesment.dto';
import { UpdateSelfAssesmentDto } from './dto/update-self-assesment.dto';

@Injectable()
export class SelfAssesmentService {
  create(createSelfAssesmentDto: CreateSelfAssesmentDto) {
    return 'This action adds a new selfAssesment';
  }

  findAll() {
    return `This action returns all selfAssesment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} selfAssesment`;
  }

  update(id: number, updateSelfAssesmentDto: UpdateSelfAssesmentDto) {
    return `This action updates a #${id} selfAssesment`;
  }

  remove(id: number) {
    return `This action removes a #${id} selfAssesment`;
  }
}
