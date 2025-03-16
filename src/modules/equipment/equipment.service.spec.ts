import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { EquipmentUserRepository } from './infrastructure/repositories/equipmentUser.repository';

describe('EquipmentService', () => {
  it("物品管理", async () => {
    const prisma = new PrismaService();
    const equipmentUserRepository = new EquipmentUserRepository(prisma);
    expect (await equipmentUserRepository.GetMany(5,1));
})});