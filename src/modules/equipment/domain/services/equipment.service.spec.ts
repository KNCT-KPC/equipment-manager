import { EquipmentRepository } from '../../infrastructure/repositories/equipment.repository';
import { EquipmentService } from './equipment.service';
import {
  EquipmentEditDTO,
  EquipmentRegisterDTO,
} from '../../application/dto/equipment.dto';

describe('EquipmentService', () => {
  let service: EquipmentService;
  let equipmentRepository: Partial<EquipmentRepository>;
  const request_user_id = 'test_uuid_v7';
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

  beforeEach(() => {
    // equipments をリセット
    equipments = [];

    // EquipmentRepository のモックを実装
    equipmentRepository = {
      Create: jest
        .fn()
        .mockImplementation(
          (create_data: EquipmentRegisterDTO, user_id?: string) => {
            const data = {
              id: Math.random().toString(36).slice(-8),
              name: create_data.name,
              description: create_data.description ?? null,
              amount: create_data.amount,
              created_at: new Date(),
              updated_at: new Date(),
              deleted_at: null,
              create_user_id: user_id ?? request_user_id,
              update_user_id: user_id ?? request_user_id,
              delete_user_id: null,
            };
            equipments.push(data);
          },
        ),
      Update: jest
        .fn()
        .mockImplementation((update: EquipmentEditDTO, user_id?: string) => {
          const equipment = equipments.find(
            (equipment) => equipment.id === update.equipment_id,
          );
          if (equipment) {
            equipment.name = update.name;
            equipment.description = update.description;
            equipment.amount = update.amount;
            equipment.updated_at = new Date();
            equipment.update_user_id = user_id ?? request_user_id;
          }
        }),
      Delete: jest
        .fn()
        .mockImplementation((id: string, delete_user_id?: string) => {
          const equipment = equipments.find((equipment) => equipment.id === id);
          if (equipment) {
            equipment.deleted_at = new Date();
            equipment.delete_user_id = delete_user_id ?? request_user_id;
          }
        }),
      findById: jest.fn().mockImplementation((id: string) => {
        return equipments.find((equipment) => equipment.id === id) || null;
      }),
    };

    // モックを元に EquipmentService のインスタンスを生成
    service = new EquipmentService(equipmentRepository as EquipmentRepository);
  });

  describe('equipmentRegister', () => {
    it('should create the data', async () => {
      await expect(
        service.equipmentRegister({
          name: 'test',
          description: 'テスト物品',
          amount: 2,
        }),
      ).resolves.toBe(true);

      expect(equipments.length).toBe(1);
      expect(equipments[0].name).toBe('test');
      expect(equipments[0].description).toBe('テスト物品');
      expect(equipments[0].amount).toBe(2);
      expect(equipments[0].create_user_id).toBe(request_user_id);
    });
  });

  describe('equipmentEdit', () => {
    it('should edit the data', async () => {
      equipments = [
        {
          id: 'equipment_id_1',
          name: 'Test Equipment',
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
          create_user_id: request_user_id,
          update_user_id: request_user_id,
          delete_user_id: null,
          description: 'テストなのだ',
          amount: 2,
        },
      ];

      await expect(
        service.equipmentEdit({
          equipment_id: 'equipment_id_1',
          name: 'Oneko Equipment',
          description: 'にゃーん',
          amount: 3,
        }),
      ).resolves.toBe(true);

      expect(equipments.length).toBe(1);
      expect(equipments[0].name).toBe('Oneko Equipment');
      expect(equipments[0].description).toBe('にゃーん');
      expect(equipments[0].amount).toBe(3);
      expect(equipments[0].updated_at).not.toBeNull();
      expect(equipments[0].update_user_id).toBe(request_user_id);
    });

    it('should throw exception if specified data does not exist', async () => {
      equipments = [
        {
          id: 'equipment_id_1',
          name: 'Test Equipment',
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
          create_user_id: request_user_id,
          update_user_id: request_user_id,
          delete_user_id: null,
          description: 'テスト物品',
          amount: 2,
        },
      ];

      await expect(
        service.equipmentEdit({
          equipment_id: 'equipment_id_555',
          name: 'Oneko Equipment',
          description: 'にゃーん',
          amount: 3,
        }),
      ).rejects.toThrow('Equipment not found');
    });
  });

  describe('equipmentDelete', () => {
    it('should logically delete the data', async () => {
      equipments = [
        {
          id: 'equipment_id_1',
          name: 'Test Equipment',
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
          create_user_id: request_user_id,
          update_user_id: request_user_id,
          delete_user_id: null,
          description: 'テスト物品',
          amount: 2,
        },
      ];

      await expect(
        service.equipmentDelete({
          equipment_id: 'equipment_id_1',
        }),
      ).resolves.toBe(true);

      expect(equipments.length).not.toBe(0);
      expect(equipments[0].deleted_at).not.toBeNull();
      expect(equipments[0].delete_user_id).toBe(request_user_id);
    });

    it('should throw exception if specified data does not exist', async () => {
      equipments = [
        {
          id: 'equipment_id_1',
          name: 'Test Equipment',
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
          create_user_id: request_user_id,
          update_user_id: request_user_id,
          delete_user_id: null,
          description: 'テスト物品',
          amount: 2,
        },
      ];

      await expect(
        service.equipmentDelete({
          equipment_id: 'equipment_id_555',
        }),
      ).rejects.toThrow('Equipment not found');
    });
  });
});
