import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import {
  EquipmentEditDTO,
  EquipmentRegisterDTO,
} from '../../application/dto/equipment.dto';
import { UserId } from '../../../../decorators/user-id.decorator';

@Injectable()
export class EquipmentRepository {
  constructor(private prisma: PrismaService) {
    this.prisma = prisma;
  }

  async Create(create_data: EquipmentRegisterDTO, @UserId() user_id?: string) {
    const equipment = await this.prisma.equipment.create({
      data: {
        name: create_data.name,
        description: create_data.description,
        amount: create_data.amount,
        create_user_id: user_id!,
        update_user_id: user_id!,
      },
    });
    console.log('equipment registered\n');
    const id_text: string = `id : ${equipment.id}`;
    const data_text: string = `date :`;
    console.log(id_text);
    console.log(data_text + JSON.stringify(equipment));
  }

  async Update(update: EquipmentEditDTO, @UserId() user_id?: string) {
    await this.prisma.equipment.update({
      where: { id: update.equipment_id },
      data: {
        name: update.name,
        description: update.description,
        amount: update.amount,
        updated_at: new Date(),
        update_user_id: user_id,
      },
    });
    console.log('equipment updated\n');
    const id_text: string = `id : ${update.equipment_id}`;
    const date_text: string = `date : ${JSON.stringify(update)}`;
    console.log(id_text);
    console.log(date_text);
  }

  async Delete(id: string, @UserId() delete_user_id?: string) {
    await this.prisma.equipment.update({
      where: { id: id },
      data: {
        deleted_at: new Date(),
        delete_user_id: delete_user_id,
      },
    });
    console.log('equipment deleted\n');
    const id_text: string = `id : ${id}`;
    const user_text: string = `delete_user : ${delete_user_id}`;
    console.log(id_text);
    console.log(user_text);
  }

  async findAll(skip: number, take: number) {
    return this.prisma.equipment.findMany({
      skip,
      take,
      where: {
        deleted_at: null,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async findById(id: string) {
    return this.prisma.equipment.findUnique({
      where: { id },
    });
  }
}
