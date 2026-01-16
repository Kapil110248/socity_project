const prisma = require('../lib/prisma');

class SocietyController {
  static async getUnits(req, res) {
    try {
      const units = await prisma.unit.findMany({
        where: { societyId: req.user.societyId },
        include: { owner: true, tenant: true }
      });
      res.json(units);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateOwnership(req, res) {
    try {
      const { id } = req.params;
      const { ownerId, tenantId } = req.body;
      const unit = await prisma.unit.update({
        where: { id: parseInt(id) },
        data: { ownerId, tenantId }
      });
      res.json(unit);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async postNotice(req, res) {
    try {
      const { title, content, audience, expiresAt } = req.body;
      const notice = await prisma.notice.create({
        data: {
          title,
          content,
          audience,
          expiresAt: expiresAt ? new Date(expiresAt) : null,
          societyId: req.user.societyId
        }
      });
      res.status(201).json(notice);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = SocietyController;
