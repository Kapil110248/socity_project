const prisma = require('../lib/prisma');

class VendorPayoutController {
  static async listPayouts(req, res) {
    try {
      const payouts = await prisma.vendorPayout.findMany({
        orderBy: { date: 'desc' },
        include: { vendor: { select: { name: true, serviceType: true } } }
      });
      res.json(payouts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createPayout(req, res) {
    try {
      const {
        vendorId,
        vendorName,
        societyId,
        societyName,
        dealValue,
        commissionPercent,
        payableAmount,
        status,
        remarks,
        date
      } = req.body;

      const payout = await prisma.vendorPayout.create({
        data: {
          vendorId: parseInt(vendorId),
          vendorName,
          societyId: societyId ? parseInt(societyId) : null,
          societyName,
          dealValue: parseFloat(dealValue),
          commissionPercent: parseFloat(commissionPercent),
          payableAmount: parseFloat(payableAmount),
          status: status || 'PENDING',
          remarks,
          date: date ? new Date(date) : new Date()
        }
      });
      res.status(201).json(payout);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getPayoutStats(req, res) {
    try {
      const payouts = await prisma.vendorPayout.findMany();
      
      const totalSocietyRevenue = payouts.reduce((sum, p) => sum + (p.dealValue || 0), 0);
      const commissionPayable = payouts.reduce((sum, p) => sum + (p.payableAmount || 0), 0);
      const pendingPayouts = payouts
        .filter(p => p.status === 'PENDING')
        .reduce((sum, p) => sum + (p.payableAmount || 0), 0);

      res.json({
        totalSocietyRevenue,
        commissionPayable,
        pendingPayouts
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = VendorPayoutController;
