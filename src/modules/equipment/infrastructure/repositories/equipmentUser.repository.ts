import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EquipmentUserRepository {
  constructor(private prisma: PrismaService) {
    this.prisma = prisma;
  }

  async Create(create_data : Prisma.EquipmentUserCreateInput){
    const equipmentuser = await this.prisma.equipmentUser.create({
      data: create_data
    })
    console.log('equipment rented\n');
    console.log(equipmentuser);
  }

  async Delete(id : string, user_id : string){
    const equipmentuser = await this.prisma.equipmentUser.update({
      where: {id : id},
      data : {
        deleted_at : new Date(),
        delete_user_id : user_id
      }
    })
    console.log('equipment returned\n');
    const id_text : string = `id : ${id}`;
    console.log(id_text);
    console.log(equipmentuser);
  }
  
  async GetByEquipmentIdAndUserId(equipment_id: string, user_id: string) {
    return await this.prisma.equipmentUser.findMany({
      where: {
        equipment: {
          id: equipment_id
        },
        user: {
          id: user_id
        },
        deleted_at: null
      }
    });
  }

  async AggregateRentAmounts(equipment_id: string) {
    return await this.prisma.equipmentUser.aggregate({
      _sum: {
        amount: true
      },
      where: {
        equipment_id: equipment_id,
        deleted_at: null
      }
    });
  }
}