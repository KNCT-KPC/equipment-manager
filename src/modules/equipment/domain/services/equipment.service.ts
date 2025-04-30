import { Injectable, NotFoundException } from '@nestjs/common';
import { EquipmentRepository } from '../../infrastructure/repositories/equipment.repository';
import {
  EquipmentDeleteDTO,
  EquipmentEditDTO,
  EquipmentRegisterDTO,
} from '../../application/dto/equipment.dto';

@Injectable()
export class EquipmentService {
  constructor(private readonly equipmentRepository: EquipmentRepository) {}

  async equipmentRegister(dto: EquipmentRegisterDTO) {
    return await this.equipmentRepository.Create(dto);
  }

  async equipmentEdit(dto: EquipmentEditDTO) {
    const equipment = await this.equipmentRepository.findById(dto.equipment_id);
    if (!equipment) {
      throw new NotFoundException('Equipment not found');
    }

    await this.equipmentRepository.Update(dto);

    return true;
  }

  async equipmentDelete(dto: EquipmentDeleteDTO) {
    const equipment = await this.equipmentRepository.findById(dto.equipment_id);
    if (!equipment) {
      throw new NotFoundException('Equipment not found');
    }

    await this.equipmentRepository.Delete(equipment.id);

    return true;
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const items = await this.equipmentRepository.findAll(skip, limit);

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
    const item = await this.equipmentRepository.findById(id);

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
