import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';


@Injectable()
export class Equipment {
  constructor(private prisma: PrismaService) {
    this.prisma = prisma;
  }

  async Registration(id: string, name: string, description: string, amount: number, create_user_id: string
  ) {
    const equipment = await this.prisma.equipment.create({
      date: {
        id : id,
        name : name,
        description : description,
        amount : amount,
        create_user_id : create_user_id
      }
    })
  }

  async Update(id: string, name: string, description: string, amount: number, update_user_id: string){
    const equipment = await this.prisma.equipment.update({
      where:{id: id},
      date:{
        name : name,
        description : description,
        amount : amount,
        update_user_id : update_user_id
      }
    })
  }
  
  async Delete(id : string, delete_user_id : string){
    const equipment = await this.prisma.equipment.delete({
      where: {id: id}
    })
    console.log('equipment deleted\n');
    const id_text : string = `id : ${id}`;
    const user_text : string = `delete_user : ${delete_user_id}`;
    console.log(id_text);
    console.log(user_text);
  }

  async Rental(id : string, user : string, equipment : string, amount : number){
    const equipmentuser = await this.prisma.equipment.create({
      date: {
        id : id,
        user_id : user,
        equipment : equipment,
        amount : amount,
        create_user_id : user
      }
    })
  }

  async Return(id : string){
    const equipmentuser = await this.prisma.equipment.delete({
      where: {id : id}
    })
  }
}
