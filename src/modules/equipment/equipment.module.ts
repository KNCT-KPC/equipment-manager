import { Module } from '@nestjs/common';
import { EquipmentController } from './application/controller/equipment.controller';
import { EquipmentService } from './domain/service/equipment.service';
import { EquipmentRepository } from './infrastructure/repositories/equipment.repository';
import { EquipmentUserRepository } from './infrastructure/repositories/equipmentUser.repository';

@Module({
  controllers: [EquipmentController],
  providers: [EquipmentService, EquipmentRepository, EquipmentUserRepository],
  exports: [EquipmentService, EquipmentRepository, EquipmentUserRepository],
})
export class EquipmentModule {}
