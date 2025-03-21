import { Module } from '@nestjs/common';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './application/services/equipment.service';
import { EquipmentRepository } from './infrastructure/repositories/equipment.repository';
import { EquipmentUserRepository } from './infrastructure/repositories/equipmentUser.repository';

@Module({
  controllers: [EquipmentController],
  providers: [EquipmentService, EquipmentRepository, EquipmentUserRepository],
  exports: [EquipmentService, EquipmentRepository, EquipmentUserRepository]
})
export class EquipmentModule {}
