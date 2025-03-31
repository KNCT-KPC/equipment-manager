import { EquipmentUserRepository } from '../infrastructure/repositories/equipmentUser.repository';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { GetLogService } from './service/getlog.service';

describe('GetLogService', () => {
  it('GetLog', async () => {
    const prisma = new PrismaService();
    const equipmentUserRepository = new EquipmentUserRepository(prisma);
    const getLogService = new GetLogService(equipmentUserRepository);
    expect(await getLogService.GetLog(2, 1));
  });
});
