import { Module } from '@nestjs/common';
import { EquipmentController } from './equipment.controller';
import { Equipment } from './infrastructure/repositories/equipment.service';
import { EquipmentUser } from './infrastructure/repositories/equipmentUser.service';

@Module({
  controllers: [EquipmentController],
  providers: [Equipment, EquipmentUser],
})
export class EquipmentModule {}
