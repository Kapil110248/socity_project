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
  const resident1User = await prisma.user.findUnique({ where: { email: 'resident1@society.com' } });

  await prisma.unit.upsert({
    where: { societyId_block_number: { societyId: society.id, block: 'A', number: '101' } },
    update: {
      ownerId: resident1User ? resident1User.id : undefined,
      status: 'OCCUPIED'
    },
    create: {
      block: 'A',
      number: '101',
      floor: 1,
      type: '3BHK',
      areaSqFt: 1500,
      societyId: society.id,
      ownerId: resident1User ? resident1User.id : undefined,
      status: 'OCCUPIED'
    }
  })

  // Create Service Categories
  await prisma.serviceCategory.createMany({
    data: [
      {
        id: 'pest_control',
        name: 'Pest Control',
        description: 'Professional termite and pest management services',
        icon: 'Shield',
        color: 'blue'
      },
      {
        id: 'cleaning',
        name: 'Deep Cleaning',
        description: 'Home and sofa deep cleaning services',
        icon: 'Wrench',
        color: 'green'
      }
    ],
    skipDuplicates: true
  });

  await prisma.serviceVariant.createMany({
    data: [
      { name: 'General Pest', price: 999, categoryId: 'pest_control' },
      { name: 'Termite Treatment', price: 4999, categoryId: 'pest_control' },
      { name: 'Full Home Clean', price: 2999, categoryId: 'cleaning' }
    ],
    skipDuplicates: true
  });

  await prisma.serviceInquiry.createMany({
    data: [
      {
        serviceName: 'General Pest',
        serviceId: 'pest_control',
        status: 'PENDING',
        type: 'BOOKING',
        societyId: society.id
      },
      {
        serviceName: 'Full Home Clean',
        serviceId: 'cleaning',
        status: 'CONFIRMED',
        vendorName: 'Premium Cleaners',
        type: 'BOOKING',
        societyId: society.id
      }
    ],
    skipDuplicates: true
  });

  // Create some marketplace items
  const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  if (admin) {
    await prisma.marketplaceItem.createMany({
      data: [
        {
          title: 'Wooden Dining Table',
          description: 'Solid teak wood 6-seater dining table in excellent condition.',
          price: 15000,
          originalPrice: 25000,
          condition: 'like_new',
          type: 'SELL',
          category: 'furniture',
          status: 'AVAILABLE',
          ownerId: admin.id,
          societyId: society.id,
        },
        {
          title: 'Mountain Bike',
          description: 'Hero Sprint mountain bike, 21 gears, sparingly used.',
          price: 8000,
          originalPrice: 12000,
          condition: 'good',
          type: 'SELL',
          category: 'vehicles',
          status: 'AVAILABLE',
          ownerId: admin.id,
          societyId: society.id,
        }
      ],
      skipDuplicates: true
    });
  }

  await prisma.emergencyLog.createMany({
    data: [
      {
        visitorName: 'Unknown Delivery',
        visitorPhone: '9876543210',
        residentName: 'John Doe',
        unit: 'A-101',
        isEmergency: true,
        reason: 'Unauthorized entry attempt',
        barcodeId: 'EB-12345',
        societyId: society.id
      }
    ],
    skipDuplicates: true
  });

  // Create Societies
  await prisma.society.upsert({
    where: { code: 'PALM1234' },
    update: {},
    create: {
      name: 'Palm Gardens',
      city: 'Chennai',
      state: 'Tamil Nadu',
      code: 'PALM1234',
      status: 'PENDING',
      subscriptionPlan: 'PROFESSIONAL',
      address: 'Old Mahabalipuram Rd, Chennai'
    }
  });

  // Create Amenities
  const clubHouse = await prisma.amenity.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Clubhouse',
      type: 'hall',
      description: 'Perfect for parties and social gatherings.',
      capacity: 100,
      chargesPerHour: 500,
      availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      timings: { start: '09:00', end: '22:00' },
      status: 'available',
      societyId: society.id
    }
  });

  const pool = await prisma.amenity.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'Swimming Pool',
      type: 'pool',
      description: 'Olympic size pool.',
      capacity: 50,
      chargesPerHour: 0,
      availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      timings: { start: '06:00', end: '20:00' },
      status: 'available',
      societyId: society.id
    }
  });

  // Create Amenity Booking for Resident 1
  const resident1 = await prisma.user.findFirst({ where: { email: 'resident1@society.com' } });
  if (resident1) {
    await prisma.amenityBooking.create({
      data: {
        userId: resident1.id,
        amenityId: clubHouse.id,
        date: new Date(),
        startTime: '18:00',
        endTime: '21:00',
        purpose: 'Birthday Party',
        amountPaid: 1500,
        status: 'CONFIRMED'
      }
    });

    // Create Emergency Contact
    await prisma.emergencyContact.create({
      data: {
        residentId: resident1.id,
        name: 'Jane Doe',
        phone: '9876543211',
        category: 'Family'
      }
    });
  }

  console.log('Seeding completed');
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
