import { Injectable } from "@nestjs/common";
import { EquipmentUserRepository } from "../../infrastructure/repositories/equipmentUser.repository";

@Injectable()
export class GetLogService {
  constructor(private equipmentUserRepository: EquipmentUserRepository) {
    this.equipmentUserRepository = equipmentUserRepository;
  }

  async GetLog(many,page) {
    const all_log = await this.equipmentUserRepository.GetAll();
    var log = [];
    if (all_log.length > many) {
      if (all_log.length > many * page) {
        var log = all_log.slice(many * (page - 1), many * page);
      } else {
        var log = all_log.slice(many * (page - 1), Object.keys(all_log).length);
      }
      return log;
    } else {
      return all_log;
    }
  }
}