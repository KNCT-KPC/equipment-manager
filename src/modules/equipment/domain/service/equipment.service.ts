import { Injectable, NotFoundException } from '@nestjs/common';
import { EquipmentRepository } from '../../infrastructure/repositories/equipment.repository';
import { EquipmentUserRepository } from '../../infrastructure/repositories/equipmentUser.repository';

@Injectable()
export class EquipmentService {
  constructor(
    private readonly equipmentRepo: EquipmentRepository,
    private readonly equipmentUserRepository: EquipmentUserRepository,
  ) {}

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

  async getEquipmentHistory(equipmentId: string) {
    const history =
      await this.equipmentUserRepository.getHistoryByEquipmentId(equipmentId);

    if (!history || history.length === 0) {
      throw new NotFoundException({
        statusCode: 404,
        message: `No rental history found for equipment ID ${equipmentId}`,
      });
    }
    return history;
  }
}
