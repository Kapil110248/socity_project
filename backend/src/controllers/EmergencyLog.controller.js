const prisma = require('../lib/prisma');

class EmergencyLogController {
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
}

module.exports = EmergencyLogController;
