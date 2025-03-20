import { Injectable } from "@nestjs/common";
import { EquipmentRepository } from "../../infrastructure/repositories/equipment.repository";

@Injectable()
export class EquipmentService {
    constructor(private equipmentRepo: EquipmentRepository) {}

    async getEquipmentList(page: number = 1, limit: number = 10) {
        const skip = (page -1) * limit
        return this.equipmentRepo.findAll(skip, limit)
    }

    async getEquipmentById(id: string) {
        return this.equipmentRepo.findById(id)
    }
}
