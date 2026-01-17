const prisma = require('../lib/prisma');

class ParkingSlotController {
  static async list(req, res) {
    try {
      const where = {};
      if (req.user.role !== 'SUPER_ADMIN') {
        where.societyId = req.user.societyId;
      }
      const slots = await prisma.parkingSlot.findMany({
        where,
        include: { unit: true }
      });
      res.json(slots);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const { number, type, status, societyId, allocatedToUnitId } = req.body;
      const slot = await prisma.parkingSlot.create({
        data: {
          number,
          type,
          status,
          societyId: parseInt(societyId || req.user.societyId),
          allocatedToUnitId: allocatedToUnitId ? parseInt(allocatedToUnitId) : null
        }
      });
      res.status(201).json(slot);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
       const slot = await prisma.parkingSlot.update({
        where: { id: parseInt(id) },
        data: req.body
      });
      res.json(slot);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      await prisma.parkingSlot.delete({ where: { id: parseInt(id) } });
      res.json({ message: 'Parking slot deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ParkingSlotController;
