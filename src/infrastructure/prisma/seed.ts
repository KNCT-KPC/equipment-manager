import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.equipment.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.userLogin.deleteMany({});
  await prisma.equipmentUser.deleteMany({});

  const user1 = await prisma.user.create({
    data: {
      name: 'ozeki',
      create_user_id: 'ozeki',
      update_user_id: '',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'sakurai',
      create_user_id: 'sakurai',
      update_user_id: '',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: 'sasaki',
      create_user_id: 'sasaki',
      update_user_id: '',
    },
  });

  await prisma.userLogin.create({
    data: {
      firebase_user_id: 'ozeki',
      user_id: user1.id,
      create_user_id: 'ozeki',
      update_user_id: '',
    },
  });

  await prisma.userLogin.create({
    data: {
      firebase_user_id: 'sakurai',
      user_id: user2.id,
      create_user_id: 'sakurai',
      update_user_id: '',
    },
  });

  await prisma.userLogin.create({
    data: {
      firebase_user_id: 'sasaki',
      user_id: user3.id,
      create_user_id: 'sasaki',
      update_user_id: '',
    },
  });

  const equipment1 = await prisma.equipment.create({
    data: {
      name: 'mac-mini',
      description: 'mac-mini',
      amount: 35,
      create_user_id: 'ozeki',
      update_user_id: '',
    },
  });

  const equipment2 = await prisma.equipment.create({
    data: {
      name: 'Dell G15',
      description: 'Dell G15',
      amount: 1,
      create_user_id: 'ozeki',
      update_user_id: '',
    },
  });

  const equipment3 = await prisma.equipment.create({
    data: {
      name: 'Monitor',
      description: 'Monitor',
      amount: 20,
      create_user_id: 'ozeki',
      update_user_id: '',
    },
  });

  await prisma.equipmentUser.create({
    data: {
      equipment_id: equipment1.id,
      user_id: user1.id,
      amount: 1,
      create_user_id: 'ozeki',
      update_user_id: '',
    },
  });

  await prisma.equipmentUser.create({
    data: {
      equipment_id: equipment2.id,
      user_id: user2.id,
      amount: 1,
      create_user_id: 'sakurai',
      update_user_id: '',
    },
  });

  await prisma.equipmentUser.create({
    data: {
      equipment_id: equipment3.id,
      user_id: user3.id,
      amount: 1,
      create_user_id: 'sasaki',
      update_user_id: '',
    },
  });
}

async function mainwrap() {
  try {
    await main();
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

void mainwrap();
