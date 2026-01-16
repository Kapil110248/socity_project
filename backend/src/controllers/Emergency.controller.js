const prisma = require('../lib/prisma');

class EmergencyController {
  static async listLogs(req, res) {
    try {
      const where = {};
      if (req.user.role !== 'SUPER_ADMIN') {
        where.societyId = req.user.societyId;
      }
      const logs = await prisma.emergencyLog.findMany({
        where,
        orderBy: { timestamp: 'desc' }
      });
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async listBarcodes(req, res) {
    try {
      const where = {};
      if (req.user.role !== 'SUPER_ADMIN') {
        where.societyId = req.user.societyId;
      }
      const barcodes = await prisma.emergencyBarcode.findMany({
        where,
        orderBy: { createdAt: 'desc' }
      });
      res.json(barcodes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateBarcodeStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const barcode = await prisma.emergencyBarcode.update({
        where: { id },
        data: { status }
      });
      res.json(barcode);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = EmergencyController;
