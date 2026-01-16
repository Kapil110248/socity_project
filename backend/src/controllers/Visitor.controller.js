const prisma = require('../lib/prisma');

class VisitorController {
  static async list(req, res) {
    try {
      const { status, search, unitId } = req.query;
      const where = {
        societyId: req.user.societyId
      };

      if (status) where.status = status;
      if (unitId) where.visitingUnitId = parseInt(unitId);
      if (search) {
        where.name = { contains: search };
      }

      const visitors = await prisma.visitor.findMany({
        where,
        include: {
          unit: true
        },
        orderBy: { createdAt: 'desc' }
      });

      res.json(visitors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async checkIn(req, res) {
    try {
      const { name, phone, visitingUnitId, purpose, vehicleNo, idType, idNumber, photo } = req.body;
      const visitor = await prisma.visitor.create({
        data: {
          name,
          phone,
          visitingUnitId: parseInt(visitingUnitId),
          purpose,
          vehicleNo,
          idType,
          idNumber,
          photo,
          status: 'CHECKED_IN',
          entryTime: new Date(),
          societyId: req.user.societyId
        }
      });
      res.status(201).json(visitor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async preApprove(req, res) {
    try {
      const { name, phone, purpose } = req.body;
      // Residents can pre-approve
      const visitor = await prisma.visitor.create({
        data: {
          name,
          phone,
          purpose,
          visitingUnitId: 1, // Logic to find resident's unit needed
          status: 'APPROVED',
          societyId: req.user.societyId
        }
      });
      res.status(201).json(visitor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async checkOut(req, res) {
    try {
      const { id } = req.params;
      const visitor = await prisma.visitor.update({
        where: { id: parseInt(id) },
        data: {
          status: 'CHECKED_OUT',
          exitTime: new Date()
        }
      });
      res.json(visitor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = VisitorController;
