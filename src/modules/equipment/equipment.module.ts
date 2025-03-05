import { Module } from '@nestjs/common';
import { EquipmentController } from './equipment.controller';
import { EquipmentRepository } from './infrastructure/repositories/equipment.service';
import { EquipmentUser } from './infrastructure/repositories/equipmentUser.service';

@Module({
  controllers: [EquipmentController],
  providers: [EquipmentRepository, EquipmentUser],
})
export class EquipmentModule {}
