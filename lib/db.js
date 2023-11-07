const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
})

async function main() {
  await prisma.customer.findMany()
  // await prisma.customer.create({
  //   data: {
  //     customerName: "Haroun",
  //     customerEmail: "haroun@gmail.com",
  //     customerAddress: "Oran",
  //   },
  // })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

export default prisma
