import { IsInt, Min, Max, IsOptional } from "class-validator"
import { Type } from "class-transformer"

export class GetEquipmentListDto{
    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: 'page must be a natural number'})
    @Min(1, { message: 'page must be 1 or greater'})
    page?: number

    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: 'limit must be an integer between 1 and 100'})
    @Min(1, { message: 'limit must be at last 1'})
    @Max(100, { message: 'limit must be at most 100'})
    limit?: number
}