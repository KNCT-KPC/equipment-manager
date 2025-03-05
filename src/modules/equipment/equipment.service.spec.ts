import { NestFactory } from "@nestjs/core";
import { Handler } from "aws-lambda";
import { EquipmentModule } from "./equipment.module";
import { EquipmentRepository } from "./infrastructure/repositories/equipment.service";

export const handler: Handler = async (event) => {
  const app = await NestFactory.create(EquipmentModule);
  const equipmentRepository = app.get(EquipmentRepository);
  await equipmentRepository.Create({amount : 1,name : "table", create_user_id : "0195527e-94ec-7d13-a59b-8142a1e6090c",  update_user_id : ""});
  return { message: "equipment created" };
};


describe('EquipmentService', () => {
  it("物品管理", async () => {
    expect (Handler).toBeUndefined();
})});