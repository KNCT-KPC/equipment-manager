import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EquipmentService } from '@/modules/equipment/domain/services/equipment.service';
import { GetEquipmentListDto } from '../dto/get-equipment-list.dto';
import { EquipmentDeleteDTO, EquipmentEditDTO, EquipmentRegisterDTO } from '../dto/equipment.dto';
import { EquipmentUserService } from '@modules/equipment/domain/services/equipmentUser.service';
import { UserId } from '@decorators/user-id.decorator';
import { EquipmentUserRentalDTO, EquipmentUserRentalRequestDTO } from '../dto/equipmentUser.dto';

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService, private readonly equipmentUserService: EquipmentUserService) {}

  @Get()
  async getEquipmentList(@Query() query: GetEquipmentListDto) {
    const page = query.page ?? 1;
    const limit = Number(query.limit) ?? Infinity;
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

  @Post()
  async registerEquipmentInfo(@Body() dto: EquipmentRegisterDTO) {
    const data = await this.equipmentService.equipmentRegister(dto);
    return {
      id: data.id
    }
  }

  @Put(':id')
  @HttpCode(204)
  async editEquipmentInfo(@Param('id', ParseUUIDPipe) id, @Body() dto: EquipmentEditDTO) {
    if (dto.amount == undefined && dto.description == undefined && dto.name == undefined) {
      throw new BadRequestException({
        message: "Empty field"
      });
    }

    await this.equipmentService.equipmentEdit(dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteEquipmentInfo(@Param('id', ParseUUIDPipe) id) {
    await this.equipmentService.equipmentDelete({
      equipment_id: id
    });
  }

  @Post(':id/rental')
  @HttpCode(204)
  async rentalEquipment(@Param('id', ParseUUIDPipe) equipment_id, @Body() dto: EquipmentUserRentalRequestDTO, @UserId() uid) {
    await this.equipmentUserService.equipmentRental({
      equipment_id: equipment_id,
      amount: dto.amount
    }, uid);
  }

  @Post(':id/return')
  @HttpCode(204)
  async returnEquipment(@Param('id', ParseUUIDPipe) equipment_id, @UserId() uid) {
    await this.equipmentUserService.equipmentReturn({
      equipment_id: equipment_id,
    }, uid);
  }
}
