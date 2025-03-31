import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EquipmentUserRepository } from '../../infrastructure/repositories/equipmentUser.repository';
import { EquipmentRepository } from '../../infrastructure/repositories/equipment.repository';
import {
  EquipmentUserRentalDTO,
  EquipmentUserReturnDTO,
} from '../../application/dto/equipmentUser.dto';

@Injectable()
export class EquipmentUserService {
  constructor(
    private readonly equipmentRepository: EquipmentRepository,
    private readonly equipmentUserRepository: EquipmentUserRepository,
  ) {}

  async equipmentRental(dto: EquipmentUserRentalDTO, request_user_id: string) {
    // 物品が存在するか？
    const equipment = await this.equipmentRepository.findById(dto.equipment_id);
    if (!equipment) {
      throw new NotFoundException('Equipment not found');
    }

    // 貸出を要求したユーザーがすでに同一物品を借りているか？
    const equipmentUser =
      await this.equipmentUserRepository.GetByEquipmentIdAndUserId(
        dto.equipment_id,
        request_user_id,
      );
    if (equipmentUser && equipmentUser.length > 0) {
      throw new BadRequestException('Already rented');
    }

    // 物品の在庫があるか？
    if (equipment.amount < dto.amount) {
      throw new BadRequestException('Insufficient stock');
    }
    const rentAmount = await this.equipmentUserRepository.AggregateRentAmounts(
      dto.equipment_id,
    );
    if ((rentAmount._sum.amount ?? 0 + dto.amount) > equipment.amount) {
      throw new BadRequestException('Insufficient stock');
    }

    // 物品を借りる
    await this.equipmentUserRepository.Create(dto, request_user_id);

    return true;
  }

  async equipmentReturn(dto: EquipmentUserReturnDTO, request_user_id: string) {
    // 物品が存在するか？
    const equipment = await this.equipmentRepository.findById(dto.equipment_id);
    if (!equipment) {
      throw new NotFoundException('Equipment not found');
    }

    // 物品の貸出履歴が存在するか？
    const equipmentUser =
      await this.equipmentUserRepository.GetByEquipmentIdAndUserId(
        dto.equipment_id,
        request_user_id,
      );
    if (!equipmentUser || equipmentUser.length === 0) {
      throw new BadRequestException('Equipment not rented');
    }

    // 物品を返す
    for (const eu of equipmentUser) {
      await this.equipmentUserRepository.Delete(eu.id, request_user_id);
    }

    return true;
  }
}
