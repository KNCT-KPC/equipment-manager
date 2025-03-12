export class EquipmentRegisterDTO {
  name: string;
  description: string;
  amount: number;
}

export class EquipmentEditDTO {
  equipment_id: string;
  name: string;
  description: string;
  amount: number;
}

export class EquipmentDeleteDTO {
  equipment_id: string;
}