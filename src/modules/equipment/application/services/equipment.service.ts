import { Injectable, NotFoundException } from '@nestjs/common';
import { EquipmentRepository } from '../../infrastructure/repositories/equipment.repository';
import { NotFoundError } from 'rxjs';

@Injectable()
export class EquipmentService {
  constructor(private readonly equipmentRepo: EquipmentRepository) {}

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const items = await this.equipmentRepo.findAll(skip, limit);

    if (!items || items.length === 0) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'No equipment found',
        error: 'Not found',
      });
    }
    return items;
  }

  async getEquipmentById(id: string) {
    const item = await this.equipmentRepo.findById(id);

    if (!item) {
      throw new NotFoundException({
        statusCode: 404,
        message: `Equipment with ID ${id} not found`,
        error: 'Not found',
      });
    }
    return item;
  }
}
