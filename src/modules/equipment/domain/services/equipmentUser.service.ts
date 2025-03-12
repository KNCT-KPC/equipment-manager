import { Injectable } from "@nestjs/common";
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
      throw new Error("Equipment not found");
    }
    
    // 物品の在庫があるか？
    const remtAmount = await this.equipmentUserRepository.AggregateRentAmounts(dto.equipment_id);
    if (remtAmount._sum.amount ?? 0 + dto.amount > equipment.amount) {
      throw new Error("Equipment is out of stock");
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
      throw new Error("Equipment not found");
    }

    // 物品の貸出履歴が存在するか？
    const equipmentUser = await this.equipmentUserRepository.GetByEquipmentIdAndUserId(dto.equipment_id, request_user_id);
    if (!equipmentUser || equipmentUser.length === 0) {
      throw new Error("Equipment rental history not found");
    } else if (equipmentUser.length > 1) {
      // 同一ユーザーが同一物品を複数回借りている場合はエラー（返却後のデータは含まない）
      throw new Error("Multiple equipment rental histories found. Please contact the administrator.");
    }

    // 物品を返す
    await this.equipmentUserRepository.Delete(dto.equipment_id, request_user_id);

    return true;
  }
}