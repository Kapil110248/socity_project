const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PurchaseRequestController {
  // List all purchase requests for the user's society
  static async getAll(req, res) {
    try {
      const societyId = req.user.societyId;
      const requests = await prisma.purchaseRequest.findMany({
        where: { societyId },
        include: { requestedBy: { select: { id: true, name: true, email: true } } },
        orderBy: { createdAt: 'desc' },
      });
      res.json({ success: true, data: requests });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Get a single purchase request
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const request = await prisma.purchaseRequest.findUnique({
        where: { id: parseInt(id) },
        include: { requestedBy: { select: { id: true, name: true, email: true } } },
      });
      if (!request) return res.status(404).json({ success: false, message: 'Purchase request not found' });
      res.json({ success: true, data: request });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Create a new purchase request
  static async create(req, res) {
    try {
      const { title, description, amount } = req.body;
      const societyId = req.user.societyId;
      const requestedById = req.user.id;
      const request = await prisma.purchaseRequest.create({
        data: { title, description, amount: parseFloat(amount), societyId, requestedById },
      });
      res.status(201).json({ success: true, data: request });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Update a purchase request (e.g., status change)
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { title, description, amount, status } = req.body;
      const updated = await prisma.purchaseRequest.update({
        where: { id: parseInt(id) },
        data: {
          title,
          description,
          amount: amount ? parseFloat(amount) : undefined,
          status,
        },
      });
      res.json({ success: true, data: updated });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Delete a purchase request
  static async remove(req, res) {
    try {
      const { id } = req.params;
      await prisma.purchaseRequest.delete({ where: { id: parseInt(id) } });
      res.json({ success: true, message: 'Purchase request deleted' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = PurchaseRequestController;
