/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-console */

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log('\n🌱 Iniciando processo de seed do EcoGest...\n');

  // console.log('⏳ Cadastrando entidades AGTs...');
  // await sleep(500);

  // const entities = await prisma.entity.createMany({
  //   data: [
  //     {
  //       nif: '5000123456',
  //       name: 'Explora Diamantes, LDA',
  //       entityType: 'COMPANY',
  //     },
  //     {
  //       nif: '5000654321',
  //       name: 'ANGLOBAL - COM. INDÚSTRIA E SERVIÇOS, S.A',
  //       entityType: 'COMPANY',
  //     },
  //   ],
  // });

  // console.log('✅ Entidades AGTs cadastradas com sucesso!\n');
  // await sleep(800);

  console.log('⏳ Criando usuário administrador...');
  await sleep(1000);

  await prisma.user.upsert({
    where: { email: 'admin@ecogest.gov.ao' },
    update: {},
    create: {
      nif: 'ADMIN',
      role: 'ADMIN',
      name: 'Administrador Ecogest',
      email: 'admin@ecogest.gov.ao',
      password: await bcrypt.hash('admin', 10),
      entityType: 'COMPANY',
      isEmailVerified: true,
      isIdentityVerified: true,
    },
  });

  console.log('⏳ Criando usuário MINISTÉRIO DO AMBIENTE...');
  await sleep(1000);

  await prisma.user.upsert({
    where: { email: 'minamb@ecogest.gov.ao' },
    update: {},
    create: {
      nif: 'MINAMB',
      role: 'GOVERNMENT',
      name: 'Ministério do Ambiente',
      email: 'minamb@ecogest.gov.ao',
      password: await bcrypt.hash('minamb', 10),
      entityType: 'COMPANY',
      isEmailVerified: true,
      isIdentityVerified: true,
    },
  });

  console.log('⏳ Criando usuário AGT...');
  await sleep(1000);

  await prisma.user.upsert({
    where: { email: 'agt@ecogest.gov.ao' },
    update: {},
    create: {
      nif: 'AGT',
      role: 'AGT',
      name: 'Administração Geral Tributária',
      email: 'agt@ecogest.gov.ao',
      password: await bcrypt.hash('agt', 10),
      entityType: 'COMPANY',
      isEmailVerified: true,
      isIdentityVerified: true,
    },
  });

  //await sleep(800);

  // console.log('⏳ Criando entidades empresariais...');
  // await sleep(500);

  // await prisma.user.createMany({
  //   data: [
  //     {
  //       nif: '5000123456',
  //       role: 'COMPANY',
  //       name: 'Explora Diamantes, LDA',
  //       email: 'exploradiamantes@gmail.com',
  //       password: '123456',
  //       entityType: 'COMPANY',
  //     },
  //     {
  //       nif: '5000654321',
  //       role: 'COMPANY',
  //       name: 'ANGLOBAL - COM. INDÚSTRIA E SERVIÇOS, S.A',
  //       email: 'anglobal@gmail.com',
  //       password: '654321',
  //       entityType: 'COMPANY',
  //     },
  //   ],
  // });

  console.log('🎉 Seed finalizado com sucesso!\n');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar o seed:\n', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('🔌 Conexão com o banco de dados encerrada.\n');
  });
