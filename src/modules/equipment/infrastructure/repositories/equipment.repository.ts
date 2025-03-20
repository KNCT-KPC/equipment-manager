import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EquipmentRepository {
  constructor(private prisma: PrismaService) {
    this.prisma = prisma;
  }

  async Create(create_data : Prisma.EquipmentCreateInput){
    const equipment = await this.prisma.equipment.create({
      data: create_data
    })
    console.log('equipment registered\n');
    const id_text : string = `id : ${equipment.id}`;
    const data_text : string = `date : ${equipment}`;
    console.log(id_text);
    console.log(data_text);
  }

  async Update(id: string, update : Prisma.EquipmentUpdateInput){
    const equipment = await this.prisma.equipment.update({
      where:{id: id},
      data: update
    })
    console.log('equipment updated\n');
    const id_text : string = `id : ${id}`;
    const date_text : string = `date : ${update}`;
    console.log(id_text);
    console.log(date_text);
  }
  
  async Delete(id : string, delete_user_id : string){
    const equipment = await this.prisma.equipment.update({
      where: {id: id},
      data: {
        deleted_at: new Date(),
        delete_user_id: delete_user_id}
    })
    console.log('equipment deleted\n');
    const id_text : string = `id : ${id}`;
    const user_text : string = `delete_user : ${delete_user_id}`;
    console.log(id_text);
    console.log(user_text);
  }

  async findAll(skip: number, take: number){
    return this.prisma.equipment.findMany({
      skip,
      take,
      where: {
        deleted_at: null,
      },
      orderBy: {
        created_at: 'desc',
      },
    })
  }

  async findById(id: string){
    return this.prisma.equipment.findUnique({
      where: { id },
    })
  }
}