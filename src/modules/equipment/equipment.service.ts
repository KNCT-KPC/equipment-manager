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

  async Registration(name: string, description: string, amount: number, create_user_id: string
  ) {
    const equipment = await this.prisma.equipment.create({
      data: {
        // id : id,
        name : name,
        description : description,
        amount : amount,
        create_user_id : create_user_id,
        update_user_id : ""
      }
    })
    console.log('equipment registered\n');
    const id_text : string = `id : ${equipment.id}`;
    const name_text : string = `name : ${name}`;
    const user_text : string = `create_user : ${create_user_id}`;
    const amount_text : string = `amount : ${amount}`;
    console.log(id_text);
    console.log(name_text);
    console.log(user_text);
    console.log(amount_text);
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

  async Rental(user_id : string, equipment : string,  amount : number){
    const equipmentuser = await this.prisma.equipmentUser.create({
      data: {
        user : {connect : {id : user_id}},
        equipment : {connect : {id : equipment}},
        amount : amount,
        create_user_id : user_id,
        update_user_id : ""
      }
    })
    console.log('equipment rented\n');
    const user_text : string = `user : ${user_id}`;
    const equipment_text : string = `equipment : ${equipment}`;
    const amount_text : string = `amount : ${amount}`;
    console.log(user_text);
    console.log(equipment_text);
    console.log(amount_text);
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