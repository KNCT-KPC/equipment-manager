import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}
  async Create(create_data: Prisma.UserCreateInput) {
    const user = await this.prisma.user.create({
      data: create_data,
    });
    console.log('user registered\n');
    const id_text: string = `id : ${user.id}`;
    const data_text: string = `data : ${JSON.stringify(user, null, 2)}`;
    console.log(id_text);
    console.log(data_text);
  }

  async Get(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });
    console.log('user found\n');
    const id_text: string = `id : ${id}`;
    const user_text: string = `data : ${JSON.stringify(user, null, 2)}`;
    console.log(id_text);
    console.log(user_text);
    return user;
  }

  async Update(id: string, update: Prisma.UserUpdateInput) {
    await this.prisma.user.update({
      where: { id: id },
      data: update,
    });
    console.log('user updated\n');
    const id_text: string = `id : ${id}`;
    const data_text: string = `data : ${JSON.stringify(update, null, 2)}`;
    console.log(id_text);
    console.log(data_text);
  }

  async Delete(id: string, delete_user_id: string) {
    await this.prisma.user.update({
      where: { id: id },
      data: {
        deleted_at: new Date(),
        delete_user_id: delete_user_id,
      },
    });
    console.log('user deleted\n');
    const id_text: string = `id : ${id}`;
    const user_text: string = `delete_user : ${delete_user_id}`;
    console.log(id_text);
    console.log(user_text);
  }
}
