import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { v4 } from 'uuid';
import { PrismaClient } from '@prisma/client';

const rl = readline.createInterface({ input, output });
const prisma = new PrismaClient();

while(true) {
  const answer = await rl.question('이름을 입력해주세요(종료: exit): ');
  const name = answer.trim();
  if (name === 'exit') {
    break;
  }

  const user = await prisma.user.create({
    data: {
      uuid: v4(),
      name,
    },
  });

  const uuid = user.uuid;

  console.log(`사용자를 추가했습니다. uuid: ${uuid}`);
}
await prisma.$disconnect();
rl.close();
