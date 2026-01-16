const prisma = require('../lib/prisma');

class PlatformInvoiceController {
  static async listInvoices(req, res) {
    try {
      const invoices = await prisma.platformInvoice.findMany({
        include: { society: true },
        orderBy: { createdAt: 'desc' }
      });
      const formattedInvoices = invoices.map(inv => ({
        ...inv,
        societyName: inv.society.name,
        amount: `₹${inv.amount.toLocaleString()}`
      }));
      res.json(formattedInvoices);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createInvoice(req, res) {
    try {
      const { societyId, amount, dueDate, invoiceNo } = req.body;
      const invoice = await prisma.platformInvoice.create({
        data: {
          societyId: parseInt(societyId),
          amount: parseFloat(amount),
          dueDate: new Date(dueDate),
          invoiceNo: invoiceNo || `INV-${Date.now()}`,
          status: 'PENDING'
        }
      });
      res.status(201).json(invoice);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getStats(req, res) {
    try {
      const totalRevenue = await prisma.platformInvoice.aggregate({
        where: { status: 'PAID' },
        _sum: { amount: true }
      });

      const invoicesByStatus = await prisma.platformInvoice.groupBy({
        by: ['status'],
        _count: { id: true },
        _sum: { amount: true }
      });

      // Monthly revenue trend (last 12 months)
      const twelveMonthsAgo = new Date();
      twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);
      twelveMonthsAgo.setDate(1);

      const monthlyTrend = await prisma.platformInvoice.findMany({
        where: {
          status: 'PAID',
          paidDate: { gte: twelveMonthsAgo }
        },
        select: {
          amount: true,
          paidDate: true
        }
      });

      // Simple grouping for trend (could be more robust)
      const trend = {};
      monthlyTrend.forEach(inv => {
        const month = inv.paidDate.toLocaleString('default', { month: 'short' });
        trend[month] = (trend[month] || 0) + inv.amount;
      });

      // Top societies by revenue
      const topSocietiesData = await prisma.platformInvoice.groupBy({
        by: ['societyId'],
        where: { status: 'PAID' },
        _sum: { amount: true },
        orderBy: {
          _sum: {
            amount: 'desc'
          }
        },
        take: 5
      });

      const topSocieties = await Promise.all(
        topSocietiesData.map(async (item) => {
          const society = await prisma.society.findUnique({ where: { id: item.societyId } });
          return {
            name: society?.name || 'Unknown',
            revenue: `₹${(item._sum.amount || 0).toLocaleString()}`,
            growth: '+0%'
          };
        })
      );

      res.json({
        totalRevenue: totalRevenue._sum.amount || 0,
        invoicesByStatus,
        trend,
        topSocieties
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const data = { status };
      if (status === 'PAID') {
        data.paidDate = new Date();
      }
      const invoice = await prisma.platformInvoice.update({
        where: { id: parseInt(id) },
        data
      });
      res.json(invoice);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = PlatformInvoiceController;
