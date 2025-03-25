import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { EquipmentService } from './application/services/equipment.service';
import { GetEquipmentListDto } from './application/dto/get-equipment-list.dto';

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Get()
  async getEquipmentList(@Query() query: GetEquipmentListDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? Infinity;
    return this.equipmentService.findAll(page, limit);
  }

  @Get(':id')
  async getEquipmentById(@Param('id', ParseUUIDPipe) id: string) {
    const item = await this.equipmentService.getEquipmentById(id);
    if (!item) {
      throw new NotFoundException({
        statusCode: 404,
        message: `Equipment with ID ${id} not found`,
        error: 'Not Found',
      });
    }
    return item;
  }
}
