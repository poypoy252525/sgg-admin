const { PrismaClient } = require("../generated/prisma/index.js");

const prisma = new PrismaClient();

async function main() {
  await prisma.course.create({
    data: {
      title: "Alternative Learning System (ALS)",
      type: "DEPED",
    },
  });
}

main().finally(() => {
  prisma.$disconnect();
});
