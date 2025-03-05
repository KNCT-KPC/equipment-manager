import { Module } from '@nestjs/common';
import { EquipmentController } from './equipment.controller';
import { EquipmentRepository } from './infrastructure/repositories/equipment.repository';
import { EquipmentUserRepository } from './infrastructure/repositories/equipmentUser.repository';

@Module({
  controllers: [EquipmentController],
  providers: [EquipmentRepository, EquipmentUserRepository],
})
export class EquipmentModule {}
