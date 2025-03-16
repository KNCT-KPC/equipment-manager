import { EquipmentRepository } from "../infrastructure/repositories/equipment.repository";
import { GetEquipmentListService } from "./service/getequipment.service";
import { PrismaService } from "../../../infrastructure/prisma/prisma.service";


describe('get equipmentlist',()=>{
  it('物品リスト取得',async ()=>{
    const prisma = new PrismaService();
    const equipmentRepository = new EquipmentRepository(prisma);
    const getequipment = new GetEquipmentListService(equipmentRepository);
    expect(await getequipment.GetEquipmentList(5,1))
  })
})