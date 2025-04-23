import { Module } from '@nestjs/common';
import { EquipmentController } from './application/controller/equipment.controller';
import { EquipmentService } from './domain/services/equipment.service';
import { EquipmentRepository } from './infrastructure/repositories/equipment.repository';
import { EquipmentUserRepository } from './infrastructure/repositories/equipmentUser.repository';
import { EquipmentUserService } from './domain/services/equipmentUser.service';

@Module({
  controllers: [EquipmentController],
  providers: [EquipmentService, EquipmentUserService, EquipmentRepository, EquipmentUserRepository],
  exports: [EquipmentService, EquipmentUserService, EquipmentRepository, EquipmentUserRepository],
})
export class EquipmentModule {}
