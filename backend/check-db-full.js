const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany()
  console.log('Total Users:', users.length)
  users.forEach(u => console.log(`User: ${u.name}, Email: ${u.email}, Role: ${u.role}`))

  const roles = await prisma.roleModel.findMany({ include: { permissions: true } })
  console.log('Roles Count:', roles.length)
  roles.forEach(r => console.log(`Role: ${r.name}, Permissions: ${r.permissions.length}`))
}

main().finally(() => prisma.$disconnect())
