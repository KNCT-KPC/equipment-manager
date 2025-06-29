import { Module } from '@nestjs/common';
import { EquipmentController } from './application/controller/equipment.controller';
import { EquipmentService } from './domain/services/equipment.service';
import { EquipmentRepository } from './infrastructure/repositories/equipment.repository';
import { EquipmentUserRepository } from './infrastructure/repositories/equipmentUser.repository';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { EquipmentUserService } from './domain/services/equipmentUser.service';

@Module({
  imports: [PrismaModule],
  controllers: [EquipmentController],
  providers: [
    EquipmentService,
    EquipmentUserService,
    EquipmentRepository,
    EquipmentUserRepository,
  ],
  exports: [
    EquipmentService,
    EquipmentUserService,
    EquipmentRepository,
    EquipmentUserRepository,
  ],
})
export class EquipmentModule {}
