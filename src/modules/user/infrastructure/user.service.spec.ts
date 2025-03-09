// import { NestFactory } from "@nestjs/core";
// import { Handler } from "aws-lambda";
// import { UserModule } from "../user.module";
// import { UserRepository } from "./repositories/user.repository";

// export const handler: Handler = async (event) => {
//   const app = await NestFactory.create(UserModule);
//   await app.init();
//   const userRepository = app.get(UserRepository);
//   await userRepository.Create({name: "akaki",create_user_id: "",update_user_id: ""});
//   await app.close();
// };

// describe('UserRepository', () => {
//   it('should return user from id', async () => {
//     expect (await handler()).toBeUndefined;
//   })
// });
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../../infrastructure/prisma/prisma.service";

export class UserRepository {
  constructor(private prisma: PrismaService) {}
  async Create(create_data : Prisma.UserCreateInput){
    const user = await this.prisma.user.create({
      data: create_data
    })
    console.log('user registered\n');
    const id_text : string = `id : ${user.id}`;
    const data_text : string = `data : ${JSON.stringify(user, null, 2)}`;
    console.log(id_text);
    console.log(data_text);
  }
  async Get(id: string){
    const user = await this.prisma.user.findUnique({
      where: {id: id}
    })
    console.log('user found\n');
    const id_text : string = `id : ${id}`;
    const user_text : string = `data : ${JSON.stringify(user, null, 2)}`;
    console.log(id_text);
    console.log(user_text);
    return user;
  }

  async Update(id: string, update : Prisma.UserUpdateInput){
    const user = await this.prisma.user.update({
      where:{id: id},
      data: update
    })
    console.log('user updated\n');
    const id_text : string = `id : ${id}`;
    const data_text : string = `data : ${JSON.stringify(update, null, 2)}`;
    console.log(id_text);
    console.log(data_text);
  }

  async Delete(id : string, delete_user_id : string){
    const user = await this.prisma.user.update({
      where: {id: id},
      data: {
        deleted_at: new Date(),
        delete_user_id: delete_user_id}
    })
    console.log('user deleted\n');
    const id_text : string = `id : ${id}`;
    const user_text : string = `delete_user : ${delete_user_id}`;
    console.log(id_text);
    console.log(user_text);
  }
}
describe("UserRepository", () => {
  const sum = new UserRepository(new PrismaService);
  it("should create a user", async () => {
    const createData = { name: "akaki", create_user_id: "", update_user_id: "" };
    const id = "0195792b-8c1d-7ae1-9db1-581da4638838";

    expect(await sum.Get(id));

  });
});