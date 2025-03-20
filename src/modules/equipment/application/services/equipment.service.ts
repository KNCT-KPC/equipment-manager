import { Injectable } from "@nestjs/common";
import { EquipmentRepository } from "../../infrastructure/repositories/equipment.repository";

@Injectable()
export class EquipmentService {
    constructor(private equipmentRepo: EquipmentRepository) {}

    async getEquipmentList(page: number = 1, Limit: number = 10) {
        const skip = (page -1) * Limit
        return this.equipmentRepo.findAll(skip, Limit)
    }

    async getEquipmentById(id: string) {
        return this.equipmentRepo.findById(id)
    }
}
