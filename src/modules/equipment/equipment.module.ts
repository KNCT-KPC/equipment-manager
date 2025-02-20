import { Module } from '@nestjs/common';
import { EquipmentController } from './equipment.controller';

@Module({
  controllers: [EquipmentController]
})
export class EquipmentModule {}
