import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';


@Injectable()
export class Equipment {
  constructor(private prisma: PrismaService) {
    this.prisma = prisma;
  }

  async Registration(id: string, name: string, description: string, amount: number, create_user_id: string
  ) {
    const equipment = await this.prisma.equipment.create({
      date: {
        id : id,
        name : name,
        description : description,
        amount : amount,
        create_user_id : create_user_id
      }
    })
  }


}