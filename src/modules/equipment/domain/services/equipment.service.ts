import { Injectable } from "@nestjs/common";
import { EquipmentRepository } from "../../infrastructure/repositories/equipment.repository";
import { EquipmentDeleteDTO, EquipmentEditDTO, EquipmentRegisterDTO } from "../../application/dto/equipment.dto";

@Injectable()
export class EquipmentService {
  constructor(
    private readonly equipmentRepository: EquipmentRepository
  ) {}

  async equipmentRegister(dto: EquipmentRegisterDTO, request_user_id: string) {
    this.equipmentRepository.Create({
      name: dto.name,
      description: dto.description,
      amount: dto.amount,
      create_user_id: request_user_id,
      update_user_id: request_user_id
    });
    return true;
  }

  async equipmentEdit(dto: EquipmentEditDTO) {
    await this.equipmentRepository.Update(dto.equipment_id, {
      name: dto.name,
      description: dto.description,
      amount: dto.amount
    });

    return true;
  }

  async equipmentDelete(dto: EquipmentDeleteDTO, request_user_id: string) {
    const equipment = await this.equipmentRepository.GetByEquipmentId(dto.equipment_id);
    if (!equipment) {
      throw new Error("Equipment not found");
    }

    await this.equipmentRepository.Delete(equipment.id, request_user_id);

    return true;
  }
}