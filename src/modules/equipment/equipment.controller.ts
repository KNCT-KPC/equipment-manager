import { Controller, Get, Param, Query } from '@nestjs/common';
import { EquipmentService } from './application/services/equipment.service';

@Controller('equipment')
export class EquipmentController {
    constructor(private equipmentService: EquipmentService) {}

    @Get()
    async getList(
        @Query('page') page: string = '1',
        @Query('limit') limit: string = '10'
    ){
        return this.equipmentService.getEquipmentList(Number(page), Number(limit))
    }

    @Get(':id')
    async getById(@Param('id') id:string) {
        return this.equipmentService.getEquipmentById(id)
    }
}
