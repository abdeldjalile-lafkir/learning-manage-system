import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@abdeldjalile.tech" },
    update: {},
    create: {
      email: "admin@abdeldjalile.tech",
      name: "Administrator",
      role: "ADMIN",
    },
  });

  console.log("Seeded admin:", admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
