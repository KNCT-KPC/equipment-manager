import { Controller, Get, NotFoundException, Param, Query, ValidationPipe } from '@nestjs/common';
import { EquipmentService } from './application/services/equipment.service';
import { IsInt, Min, Max, IsPositive } from 'class-validator'
import { Type } from 'class-transformer'
import { query } from 'express';
import { STATUS_CODES } from 'http';

class EquipmentQueryDto{
    @Type(() => Number)
    @IsInt({ message: 'page must be a natural number'})
    @IsPositive({ message: 'page must be a natural number'})
    page: number

    @Type(() => Number)
    @IsInt({ message: 'limit must be an integer between 1 and 100'})
    @Min(1, { message: 'limit must be at last 1'})
    @Max(100, { message: 'limit must be at most 100'})
    limit: number
}

@Controller('equipment')
export class EquipmentController {
    constructor(private equipmentService: EquipmentService) {}

    @Get()
    async getList(@Query(new ValidationPipe({ transform: true})) query: EquipmentQueryDto) {
        const { page, limit } = query
        const items = await this.equipmentService.findAll(page, limit)

        if (!items || items.length === 0){
            throw new NotFoundException({
                statusCode: 404,
                message: 'No equipment found',
                error: 'Not Found',
            })
        }
        return items
    }

    @Get(':id')
    async getById(@Param('id') id:string) {
        return this.equipmentService.getEquipmentById(id)
    }
}
