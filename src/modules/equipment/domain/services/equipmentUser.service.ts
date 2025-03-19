import { HttpException, Injectable } from "@nestjs/common";
import { EquipmentUserRepository } from "../../infrastructure/repositories/equipmentUser.repository";
import { EquipmentRepository } from "../../infrastructure/repositories/equipment.repository";
import { EquipmentUserRentalDTO, EquipmentUserReturnDTO } from "../../application/dto/equipmentUser.dto";

@Injectable()
export class EquipmentUserService {
  constructor(
    private readonly equipmentRepository: EquipmentRepository,
    private readonly equipmentUserRepository: EquipmentUserRepository
  ) {}

  async equipmentRental(dto: EquipmentUserRentalDTO, request_user_id: string) {
    // 物品が存在するか？
    const equipment = await this.equipmentRepository.GetByEquipmentId(dto.equipment_id);
    if (!equipment) {
      return false;
    }

    // 貸出を要求したユーザーがすでに同一物品を借りているか？
    const equipmentUser = await this.equipmentUserRepository.GetByEquipmentIdAndUserId(dto.equipment_id, request_user_id);
    if (equipmentUser && equipmentUser.length > 0) {
      return false;
    }
    
    // 物品の在庫があるか？
    if (equipment.amount < dto.amount) {
      return false;
    }
    const remtAmount = await this.equipmentUserRepository.AggregateRentAmounts(dto.equipment_id);
    if ((remtAmount._sum.amount ?? 0 + dto.amount) > equipment.amount) {
      return false;
    }

    // 物品を借りる
    this.equipmentUserRepository.Create({
      equipment: {
        connect: {
          id: dto.equipment_id
        }
      },
      user: {
        connect: {
          id: request_user_id
        }
      },
      amount: dto.amount,
      create_user_id: request_user_id,
      update_user_id: request_user_id
    });

    return true;
  }

  async equipmentReturn(dto: EquipmentUserReturnDTO, request_user_id: string) {
    // 物品が存在するか？
    const equipment = await this.equipmentRepository.GetByEquipmentId(dto.equipment_id);
    if (!equipment) {
      return false;
    }

    // 物品の貸出履歴が存在するか？
    const equipmentUser = await this.equipmentUserRepository.GetByEquipmentIdAndUserId(dto.equipment_id, request_user_id);
    if (!equipmentUser || equipmentUser.length === 0) {
      return false;
    }

    // 物品を返す
    for (const eu of equipmentUser) {
      await this.equipmentUserRepository.Delete(eu.id, request_user_id);
    }

    return true;
  }
}