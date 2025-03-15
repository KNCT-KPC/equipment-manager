
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
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

  async GetAll(){
    const equipmentusers = await this.prisma.equipmentUser.findMany(
      {
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
}

describe('EquipmentService', () => {
  it("物品管理", async () => {
    const prisma = new PrismaService();
    const equipmentUserRepository = new EquipmentUserRepository(prisma);
    expect (await equipmentUserRepository.GetAll());

})});