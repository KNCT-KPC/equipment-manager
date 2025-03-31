import { Controller, Get, Param } from '@nestjs/common';
import { EquipmentService } from '../services/equipment.service';

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Get()
  async GetEquipmentInfoID(@Param('param') param: string) {
    const data = await this.equipmentService.getEquipmentById(param);
    return (
      data.id,
      data.name,
      data.description,
      data.amount,
      data.created_at,
      data.updated_at
    );
  }
}
