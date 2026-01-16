const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedInvoices() {
  const societies = await prisma.society.findMany();
  if (societies.length === 0) {
    console.log('No societies found to create invoices for.');
    return;
  }

  for (const society of societies.slice(0, 3)) {
    await prisma.platformInvoice.create({
      data: {
        invoiceNo: `INV-2024-${Math.floor(Math.random() * 1000)}`,
        societyId: society.id,
        amount: Math.floor(Math.random() * 50000) + 10000,
        status: ['PAID', 'PENDING', 'OVERDUE'][Math.floor(Math.random() * 3)],
        issueDate: new Date(),
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        paidDate: new Date()
      }
    });
  }
  console.log('Invoices seeded successfully.');
}

seedInvoices()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
