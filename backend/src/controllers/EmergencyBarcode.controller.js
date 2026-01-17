const prisma = require('../lib/prisma');

class EmergencyBarcodeController {
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

  static async resetUserBarcodes(req, res) {
    try {
      const { phone } = req.body;
      if (!phone) {
        return res.status(400).json({ error: 'Phone number is required' });
      }

      await prisma.emergencyBarcode.deleteMany({
        where: { phone }
      });

      res.json({ message: 'Barcodes reset successfully' });
    } catch (error) {
      console.error('Reset Barcodes Error:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = EmergencyBarcodeController;
