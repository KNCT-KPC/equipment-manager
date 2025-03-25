import { Injectable } from '@nestjs/common';
import { EquipmentUserRepository } from '../../infrastructure/repositories/equipmentUser.repository';

@Injectable()
export class GetLogService {
  constructor(private equipmentUserRepository: EquipmentUserRepository) {
    this.equipmentUserRepository = equipmentUserRepository;
  }

  async GetLog(many: number, page: number) {
    const all_log = await this.equipmentUserRepository.GetMany(
      many,
      (many - 1) * page,
    );
    return all_log;
  }
}
