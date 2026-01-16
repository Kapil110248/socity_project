const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with 7 users...')

  // Create a Society
  const society = await prisma.society.upsert({
    where: { code: 'SOC001' },
    update: {},
    create: {
      name: 'Modern Living Society',
      address: '123 Tech Park, Bangalore',
      code: 'SOC001',
      status: 'ACTIVE'
    }
  })

  const users = [
    { email: 'superadmin@society.com', password: 'super123', name: 'Super Admin', role: 'SUPER_ADMIN' },
    { email: 'admin@society.com', password: 'admin123', name: 'Admin User', role: 'ADMIN' },
    { email: 'resident1@society.com', password: 'resident123', name: 'John Doe', role: 'RESIDENT' },
    { email: 'resident2@society.com', password: 'resident123', name: 'Jane Smith', role: 'RESIDENT' },
    { email: 'guard@society.com', password: 'guard123', name: 'Security Guard', role: 'GUARD' },
    { email: 'vendor@society.com', password: 'vendor123', name: 'PestFree Services', role: 'VENDOR' },
    { email: 'accountant@society.com', password: 'password123', name: 'Finance Mgr', role: 'ACCOUNTANT' },
  ]

  for (const userData of users) {
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    await prisma.user.upsert({
      where: { email: userData.email },
      update: {
        password: hashedPassword,
        role: userData.role,
        name: userData.name
      },
      create: {
        email: userData.email,
        password: hashedPassword,
        name: userData.name,
        role: userData.role,
        societyId: society.id,
        phone: '1234567890'
      }
    })
    console.log(`Created: ${userData.email} (${userData.role})`)
  }

  // Create some units
  await prisma.unit.upsert({
    where: { societyId_block_number: { societyId: society.id, block: 'A', number: '101' } },
    update: {},
    create: {
      block: 'A',
      number: '101',
      floor: 1,
      type: '3BHK',
      areaSqFt: 1500,
      societyId: society.id
    }
  })

  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
