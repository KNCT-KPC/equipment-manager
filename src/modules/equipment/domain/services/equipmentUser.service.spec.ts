import { EquipmentUserRentalDTO } from '../../application/dto/equipmentUser.dto';
import { EquipmentRepository } from '../../infrastructure/repositories/equipment.repository';
import { EquipmentUserRepository } from '../../infrastructure/repositories/equipmentUser.repository';
import { EquipmentUserService } from './equipmentUser.service';

describe('EquipmentService', () => {
  let service: EquipmentUserService;
  let equipmentRepository: Partial<EquipmentRepository>;
  let equipmentUserRepository: Partial<EquipmentUserRepository>;
  const request_user_id = 'test_uuid_v7';
  const equipment_id = 'equipment_id_1';

  // モックが参照するデータ
  let equipments: {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    create_user_id: string;
    update_user_id: string;
    delete_user_id: string | null;
    description: string | null;
    amount: number;
  }[] = [];
  let equipmentUsers: {
    id: string;
    amount: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    create_user_id: string;
    update_user_id: string;
    delete_user_id: string | null;
    equipment_id: string;
    user_id: string;
  }[] = [];

  beforeEach(() => {
    equipments = [
      {
        id: equipment_id,
        name: 'Test Equipment',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
        create_user_id: request_user_id,
        update_user_id: request_user_id,
        delete_user_id: null,
        description: 'テストなのだ',
        amount: 10,
      },
    ];
    equipmentUsers = [];
    equipmentRepository = {
      findById: jest.fn().mockImplementation((id: string) => {
        return equipments.find((equipment) => equipment.id === id);
      }),
    };
    equipmentUserRepository = {
      AggregateRentAmounts: jest
        .fn()
        .mockImplementation((equipment_id: string) => {
          const equipment = equipments.find(
            (equipment) => equipment.id === equipment_id,
          );
          if (!equipment) return { _sum: { amount: 0 } };

          const rent_amount = equipmentUsers
            .filter(
              (equipmentUser) => equipmentUser.equipment_id === equipment_id,
            )
            .reduce((acc, cur) => acc + cur.amount, 0);
          return { _sum: { amount: rent_amount } };
        }),
      Create: jest
        .fn()
        .mockImplementation(
          (
            create_data: EquipmentUserRentalDTO,
            user_id: string,
            req_user_id: string = request_user_id,
          ) => {
            console.log(create_data);
            const data = {
              id: Math.random().toString(36).slice(-8),
              amount: create_data.amount,
              created_at: new Date(),
              updated_at: new Date(),
              deleted_at: null,
              create_user_id: req_user_id,
              update_user_id: req_user_id,
              delete_user_id: null,
              equipment_id: create_data.equipment_id,
              user_id: user_id,
            };
            equipmentUsers.push(data);
          },
        ),
      GetByEquipmentIdAndUserId: jest
        .fn()
        .mockImplementation((equipment_id: string, user_id: string) => {
          return equipmentUsers.filter(
            (equipmentUser) =>
              equipmentUser.equipment_id === equipment_id &&
              equipmentUser.user_id === user_id,
          );
        }),
      Delete: jest
        .fn()
        .mockImplementation(
          (id: string, req_user_id: string = request_user_id) => {
            const index = equipmentUsers.findIndex(
              (equipmentUser) => equipmentUser.id === id,
            );
            if (index !== -1) {
              equipmentUsers[index].deleted_at = new Date();
              equipmentUsers[index].delete_user_id = req_user_id;
            }
          },
        ),
    };
    service = new EquipmentUserService(
      equipmentRepository as EquipmentRepository,
      equipmentUserRepository as EquipmentUserRepository,
    );
  });

  describe('equipmentRental', () => {
    it('should return true when rental is successful', async () => {
      const amount = 1;
      const result = await service.equipmentRental(
        { equipment_id, amount },
        request_user_id,
      );
      expect(result).toBe(true);
      expect(equipmentUsers.length).toBe(1);
      expect(equipmentUsers[0].amount).toBe(amount);
      expect(equipmentUsers[0].equipment_id).toBe(equipment_id);

      //NOTE: user_id と create_user_id, update_user_id は異なる場合がある．
      //NOTE: このテストでは同一ユーザーがリクエストしていると仮定する．
      expect(equipmentUsers[0].user_id).toBe(request_user_id);
      expect(equipmentUsers[0].create_user_id).toBe(request_user_id);
      expect(equipmentUsers[0].update_user_id).toBe(request_user_id);
    });

    it('should throw exception when the equipment is not found', async () => {
      await expect(
        service.equipmentRental(
          { equipment_id: 'not_found', amount: 1 },
          request_user_id,
        ),
      ).rejects.toThrow('Equipment not found');
    });

    it('should throw exception when the equipment is out of stock', async () => {
      await expect(
        service.equipmentRental({ equipment_id, amount: 11 }, request_user_id),
      ).rejects.toThrow('Insufficient stock');
    });

    it('should throw exception when the total rent equipments are out of stock', async () => {
      await expect(
        service.equipmentRental({ equipment_id, amount: 6 }, request_user_id),
      ).resolves.toBe(true);
      await expect(
        service.equipmentRental(
          { equipment_id, amount: 11 },
          request_user_id + '810',
        ),
      ).rejects.toThrow('Insufficient stock');
    });
  });
});
