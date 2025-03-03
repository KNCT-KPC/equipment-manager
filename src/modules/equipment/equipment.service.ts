import { Injectable } from '@nestjs/common';
// import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

const prisma = new PrismaService();
@Injectable()
export class Equipment {
  constructor(private prisma: PrismaService) {
    this.prisma = prisma;
  }

  async Registration(create_data : Prisma.EquipmentCreateInput){
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
    const equipment = await this.prisma.equipment.delete({
      where: {id: id}
    })
    console.log('equipment deleted\n');
    const id_text : string = `id : ${id}`;
    const user_text : string = `delete_user : ${delete_user_id}`;
    console.log(id_text);
    console.log(user_text);
  }

  async Rental(create_data : Prisma.EquipmentUserCreateInput){
    const equipmentuser = await this.prisma.equipmentUser.create({
      data: create_data
    })
    console.log('equipment rented\n');
    console.log(equipmentuser);
  }

  async Return(id : string, user :string, equipment : string){
    const equipmentuser = await this.prisma.equipmentUser.delete({
      where: {id : id}
    })
    console.log('equipment returned\n');
    const id_text : string = `id : ${id}`;
    const user_text : string = `user : ${user}`;
    const equipment_text : string = `equipment : ${equipment}`;
    console.log(id_text);
    console.log(user_text);
    console.log(equipment_text);
  }
}

const equipment = new Equipment(prisma);
export { equipment };