import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {
  const equipment1 = await prisma.equipment.create({
    data : {
      name : "mac-mini",
      description : "mac-mini",
      amount : 35,
      create_user_id : "ozeki",
      update_user_id : ""
    }});

  const equipment2 = await prisma.equipment.create({
    data : {
      name : "Dell G15",
      description : "Dell G15",
      amount : 1,
      create_user_id : "ozeki",
      update_user_id : ""
    }});

  const equipment3 = await prisma.equipment.create({
    data : {
      name : "Monitor",
      description : "Monitor",
      amount : 20,
      create_user_id : "ozeki",
      update_user_id : ""
    }});
}
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })