import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { EquipmentUserRentalDTO } from '../../application/dto/equipmentUser.dto';

@Injectable()
export class EquipmentUserRepository {
  constructor(private prisma: PrismaService) {
    this.prisma = prisma;
  }

  async Create(create_data : EquipmentUserRentalDTO, user_id : string) {
    const equipmentuser = await this.prisma.equipmentUser.create({
      data: {
        equipment: {
          connect: {
            id: create_data.equipment_id
          }
        },
        user: {
          connect: {
            id: user_id
          }
        },
        amount: create_data.amount,
        created_at: new Date(),
        updated_at: new Date(),
        create_user_id: user_id,
        update_user_id: user_id
      }
    })
    console.log('equipment rented\n');
    console.log(equipmentuser);
  }

  async GetMany(take : number, skip : number){
    const equipmentusers = await this.prisma.equipmentUser.findMany(
      {
        skip: skip,
        take: take,
        select: {
          user_id: true,
          equipment_id: true,
          created_at: true,
          deleted_at: true
        }
      }
    );
    console.log('all equipment users returned\n');
    console.log(JSON.stringify(equipmentusers));
    return Array.isArray(equipmentusers) ? equipmentusers : [];
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