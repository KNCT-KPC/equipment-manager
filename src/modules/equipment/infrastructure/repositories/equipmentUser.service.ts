import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { Prisma } from '@prisma/client';

const prisma = new PrismaService();
@Injectable()
export class EquipmentUser {
  constructor(private prisma: PrismaService) {
    this.prisma = prisma;
  }

  async Rental(create_data : Prisma.EquipmentUserCreateInput){
    const equipmentuser = await this.prisma.equipmentUser.create({
      data: create_data
    })
    console.log('equipment rented\n');
    console.log(equipmentuser);
  }

  async Return(id : string){
    const equipmentuser = await this.prisma.equipmentUser.delete({
      where: {id : id}
    })
    console.log('equipment returned\n');
    const id_text : string = `id : ${id}`;
    console.log(id_text);
    console.log(equipmentuser);
  }
}