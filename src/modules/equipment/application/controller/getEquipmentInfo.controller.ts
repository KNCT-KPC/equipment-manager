import { Body, Controller, Get } from "@nestjs/common";
import { EquipmentService } from "../services/equipment.service";
import { GetEquipmentInfoDto } from "../dto/getEquipmentInfo.dto";

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Get()
  async GetEquipmentInfoID(@Body() GetEquipmentInfoDto : GetEquipmentInfoDto) {
    const data = await this.equipmentService.getEquipmentById(GetEquipmentInfoDto.id);
    return data.id, data.name, data.description, data.amount, data.created_at, data.updated_at;
  }
}
