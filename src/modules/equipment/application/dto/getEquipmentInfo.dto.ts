import { IsNotEmpty, IsString } from "class-validator"

export class GetEquipmentInfoDto {
  @IsString()
  @IsNotEmpty()
  id : string;
}