import { Injectable } from '@nestjs/common';
import { EquipmentRepository } from '../../infrastructure/repositories/equipment.repository';

Injectable();
export class EquipmentService {
  constructor(private equipment: EquipmentRepository) {
    this.equipment = equipment;
  }
  async GetEquipmentList(many, page) {
    const list = await this.equipment.findAll(many, (page - 1) * many);
    return list;
  }
}
