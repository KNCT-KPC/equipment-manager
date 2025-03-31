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
    await this.equipmentRepository.Create(dto);
    return true;
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
}
