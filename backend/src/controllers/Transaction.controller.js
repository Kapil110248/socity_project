const prisma = require('../lib/prisma');

class TransactionController {
  static async list(req, res) {
    try {
      const transactions = await prisma.transaction.findMany({
        where: { societyId: req.user.societyId },
        orderBy: { date: 'desc' }
      });
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async recordIncome(req, res) {
    try {
      const { category, amount, date, receivedFrom, paymentMethod, description } = req.body;
      const transaction = await prisma.transaction.create({
        data: {
          type: 'INCOME',
          category,
          amount: parseFloat(amount),
          date: new Date(date),
          receivedFrom,
          paymentMethod,
          description,
          status: 'PAID',
          societyId: req.user.societyId
        }
      });
      res.status(201).json(transaction);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async recordExpense(req, res) {
    try {
      const { category, amount, date, paidTo, paymentMethod, description, invoiceNo } = req.body;
      const transaction = await prisma.transaction.create({
        data: {
          type: 'EXPENSE',
          category,
          amount: parseFloat(amount),
          date: new Date(date),
          paidTo,
          paymentMethod,
          invoiceNo,
          description,
          status: 'PAID',
          societyId: req.user.societyId
        }
      });
      res.status(201).json(transaction);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getStats(req, res) {
    try {
      const stats = await prisma.transaction.groupBy({
        by: ['type'],
        where: { societyId: req.user.societyId },
        _sum: { amount: true }
      });
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = TransactionController;
